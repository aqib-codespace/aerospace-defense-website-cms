"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { supabase, RFQ_BUCKET } from "@/lib/supabase/client";
import { TABLES } from "@/lib/supabase/tables";
import { getActiveSite } from "@/lib/site";
import {
  rfqSchema,
  ALLOWED_DRAWING_EXTENSIONS,
  MAX_DRAWING_BYTES,
  drawingExtension,
} from "@/lib/validation/rfq";

/**
 * Public (unauthenticated) RFQ handler — the only write path on the site that
 * isn't behind requireAdmin().
 *
 * Defences, in order: a honeypot field bots fill and humans cannot see, strict
 * schema validation, extension and size checks on the upload, a generated
 * storage key that cannot traverse paths, and fixed column mapping so nothing
 * user-supplied reaches the query builder as an identifier.
 *
 * ---------------------------------------------------------------------------
 * WHY THE DRAWING BUCKET IS PRIVATE
 * ---------------------------------------------------------------------------
 * Customer drawings in this industry routinely carry ITAR/EAR controlled
 * technical data. A public-read bucket would publish them to anyone who guessed
 * a URL, which is a compliance incident, not merely a privacy one. Uploads go to
 * a private bucket and are only ever reachable through a short-lived signed URL
 * issued to an authenticated admin.
 */
export async function submitRfq(prevState, formData) {
  // Bots fill every field they find; real users never see this one.
  if (String(formData.get("company_reference") ?? "").trim()) {
    return { success: true };
  }

  const parsed = rfqSchema.safeParse({
    company: formData.get("company"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    industry: formData.get("industry"),
    serviceNeeded: formData.get("serviceNeeded"),
    description: formData.get("description"),
    material: formData.get("material"),
    quantity: formData.get("quantity"),
    tolerance: formData.get("tolerance"),
    timeline: formData.get("timeline"),
    ndaRequired: formData.get("ndaRequired") != null,
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  if (!supabase) {
    return {
      error:
        "This site is running in preview mode, so RFQs aren't being stored yet. " +
        "Please email or call us instead.",
    };
  }

  const site = await getActiveSite();
  if (!site) {
    console.error("[rfq] No active site; refusing to store an unattributable RFQ.");
    return { error: "Something went wrong on our end. Please call us and we'll take the RFQ by phone." };
  }

  // --- Optional drawing upload ---------------------------------------------
  let attachmentPath = null;
  let attachmentName = null;

  const drawing = formData.get("drawing");
  if (drawing instanceof File && drawing.size > 0) {
    const ext = drawingExtension(drawing.name);

    if (!ALLOWED_DRAWING_EXTENSIONS.includes(ext)) {
      return {
        errors: {
          drawing: [
            `Unsupported file type “.${ext || "?"}”. Accepted: ${ALLOWED_DRAWING_EXTENSIONS.join(", ")}.`,
          ],
        },
      };
    }
    if (drawing.size > MAX_DRAWING_BYTES) {
      return {
        errors: {
          drawing: [`File is ${Math.round(drawing.size / 1024 / 1024)}MB; the limit is 25MB. Send a link instead.`],
        },
      };
    }

    // Key is generated, never derived from user input, so it cannot traverse.
    const slug =
      drawing.name
        .replace(/\.[^.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 48) || "drawing";
    const key = `site-${site.id}/${randomUUID()}-${slug}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(RFQ_BUCKET)
      .upload(key, Buffer.from(await drawing.arrayBuffer()), {
        contentType: drawing.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      console.error("[rfq] drawing upload failed:", uploadError);
      return {
        error:
          "Your details were not submitted because the drawing upload failed. " +
          "Please try again, or send the package by email.",
      };
    }

    attachmentPath = key;
    attachmentName = drawing.name.slice(0, 180);
  }

  const d = parsed.data;
  const { error } = await supabase.from(TABLES.leads).insert({
    site_id: site.id,
    name: d.name,
    phone: d.phone,
    email: d.email,
    service_needed: d.serviceNeeded,
    comments: d.description,
    status: "new",
    created_at: new Date().toISOString(),
    attachment_path: attachmentPath,
    attachment_name: attachmentName,
    // Everything specific to a manufacturing RFQ lives here, so the shared
    // leads table stays usable by other templates without new columns.
    details: {
      company: d.company,
      industry: d.industry,
      material: d.material,
      quantity: d.quantity,
      tolerance: d.tolerance,
      timeline: d.timeline,
      ndaRequired: d.ndaRequired,
      notes: d.notes,
    },
  });

  if (error) {
    // Never surface a database message to a customer.
    console.error("[rfq] insert failed:", error);
    return { error: "Something went wrong on our end. Please call us and we'll take the RFQ by phone." };
  }

  revalidatePath("/admin/leads");
  return { success: true };
}
