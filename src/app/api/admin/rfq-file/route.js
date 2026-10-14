import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/dal";
import { requireSupabase, RFQ_BUCKET } from "@/lib/supabase/client";
import { TABLES } from "@/lib/supabase/tables";
import { requireSite } from "@/lib/site";

/**
 * Issues a short-lived signed URL for a customer drawing and redirects to it.
 *
 * Drawings live in a PRIVATE bucket because they routinely carry ITAR/EAR
 * controlled technical data, so there is no public URL to link to. Access is
 * gated three ways before a URL is minted:
 *
 *   1. requireAdmin()  — an authenticated admin session
 *   2. requireSite()   — scoped to the site being served
 *   3. a database lookup proving the path belongs to a lead on THAT site
 *
 * Step 3 is the important one: without it, an admin of site A could read site B's
 * drawings by pasting a path, since the storage bucket itself has no notion of
 * which site owns a file.
 */
export async function GET(request) {
  await requireAdmin();
  const supabase = requireSupabase();
  const site = await requireSite();

  const path = new URL(request.url).searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "Missing path." }, { status: 400 });
  }

  const { data: lead, error } = await supabase
    .from(TABLES.leads)
    .select("id, attachment_name")
    .eq("site_id", site.id)
    .eq("attachment_path", path)
    .maybeSingle();
  if (error) throw error;
  if (!lead) {
    // Deliberately 404 rather than 403: confirming a path exists elsewhere would
    // leak the storage layout of other sites.
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const { data: signed, error: signError } = await supabase.storage
    .from(RFQ_BUCKET)
    .createSignedUrl(path, 120, { download: lead.attachment_name ?? true });
  if (signError) {
    return NextResponse.json({ error: signError.message }, { status: 500 });
  }

  return NextResponse.redirect(signed.signedUrl);
}
