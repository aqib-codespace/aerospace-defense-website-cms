"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/dal";
import { requireSupabase } from "@/lib/supabase/client";
import { requireSite } from "@/lib/site";
import { getCollection } from "@/lib/admin/collections";
import { tableFor, scoped, parseSubmission, namedValue } from "@/lib/admin/storage";
import { recordAudit } from "@/lib/actions/content-helpers";

/**
 * Create / update / delete / reorder for every collection, whether it is stored
 * as jsonb in the shared table or in a dedicated typed one.
 *
 * The collection travels as a hidden form value and is resolved through the
 * registry before any query is built, so the table name is never taken from user
 * input — a crafted `__collection` simply fails to resolve.
 *
 * Row ids are global, so every write filters on site_id (and, for the shared
 * table, on the collection name) as well as id: a guessed id from another site
 * or another collection must not be editable or deletable here.
 */

function resolve(formData) {
  const collection = getCollection(String(formData.get("__collection") ?? ""));
  if (!collection) throw new Error("Unknown collection.");
  return collection;
}

function describe(collection, row) {
  const value = namedValue(collection, row, collection.primaryField);
  return value ? `“${String(value).slice(0, 60)}”` : `#${row?.id ?? "?"}`;
}

async function nextSortOrder(collection, siteId) {
  const supabase = requireSupabase();
  const { data, error } = await scoped(
    supabase.from(tableFor(collection)).select("sort_order"),
    collection,
    siteId,
  )
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data?.sort_order ?? 0) + 10;
}

function afterWrite(collection) {
  revalidatePath("/");
  revalidatePath(`/admin/collections/${collection.slug}`);
  revalidatePath("/admin");
}

export async function createRow(prevState, formData) {
  const admin = await requireAdmin();
  const collection = resolve(formData);
  const supabase = requireSupabase();
  const site = await requireSite();

  const parsed = parseSubmission(collection, formData);
  if (!parsed.ok) return { errors: parsed.errors };

  const { data: inserted, error } = await supabase
    .from(tableFor(collection))
    .insert({
      ...parsed.values,
      site_id: site.id,
      sort_order: await nextSortOrder(collection, site.id),
    })
    .select()
    .single();
  if (error) return { error: error.message };

  await recordAudit({
    admin,
    action: `${collection.slug}.create`,
    entityType: collection.slug,
    entityId: inserted.id,
    summary: `Added ${collection.singular.toLowerCase()} ${describe(collection, inserted)}`,
  });

  afterWrite(collection);
  redirect(`/admin/collections/${collection.slug}`);
}

export async function updateRow(prevState, formData) {
  const admin = await requireAdmin();
  const collection = resolve(formData);
  const supabase = requireSupabase();
  const site = await requireSite();

  const id = Number(formData.get("__id"));
  if (!Number.isInteger(id)) return { error: "Missing record id." };

  const parsed = parseSubmission(collection, formData);
  if (!parsed.ok) return { errors: parsed.errors };

  const { data: updated, error } = await scoped(
    supabase
      .from(tableFor(collection))
      .update({ ...parsed.values, updated_at: new Date().toISOString() }),
    collection,
    site.id,
  )
    .eq("id", id)
    .select()
    .single();
  if (error) return { error: error.message };

  await recordAudit({
    admin,
    action: `${collection.slug}.update`,
    entityType: collection.slug,
    entityId: id,
    summary: `Updated ${collection.singular.toLowerCase()} ${describe(collection, updated)}`,
  });

  afterWrite(collection);
  return { success: true };
}

export async function deleteRow(formData) {
  const admin = await requireAdmin();
  const collection = resolve(formData);
  const supabase = requireSupabase();
  const site = await requireSite();

  const id = Number(formData.get("__id"));
  if (!Number.isInteger(id)) throw new Error("Missing record id.");

  // Read first so the audit entry can name what was removed.
  const { data: row } = await scoped(
    supabase.from(tableFor(collection)).select("*"),
    collection,
    site.id,
  )
    .eq("id", id)
    .maybeSingle();

  const { error } = await scoped(
    supabase.from(tableFor(collection)).delete(),
    collection,
    site.id,
  ).eq("id", id);
  if (error) throw error;

  await recordAudit({
    admin,
    action: `${collection.slug}.delete`,
    entityType: collection.slug,
    entityId: id,
    summary: `Deleted ${collection.singular.toLowerCase()} ${describe(collection, row)}`,
  });

  afterWrite(collection);
  redirect(`/admin/collections/${collection.slug}`);
}

/**
 * Reorders by swapping sort_order with the adjacent row. Two small updates beat
 * renumbering the whole list, and the list query's `id` tiebreaker keeps the
 * order stable when values collide.
 */
export async function moveRow(formData) {
  await requireAdmin();
  const collection = resolve(formData);
  const supabase = requireSupabase();
  const site = await requireSite();

  const id = Number(formData.get("__id"));
  const direction = String(formData.get("__direction")) === "up" ? "up" : "down";
  if (!Number.isInteger(id)) throw new Error("Missing record id.");

  const { data: rows, error } = await scoped(
    supabase.from(tableFor(collection)).select("id, sort_order"),
    collection,
    site.id,
  )
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  if (error) throw error;

  const index = rows.findIndex((row) => row.id === id);
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || targetIndex < 0 || targetIndex >= rows.length) {
    afterWrite(collection);
    return;
  }

  const current = rows[index];
  const target = rows[targetIndex];

  await Promise.all([
    scoped(
      supabase.from(tableFor(collection)).update({ sort_order: target.sort_order }),
      collection,
      site.id,
    ).eq("id", current.id),
    scoped(
      supabase.from(tableFor(collection)).update({ sort_order: current.sort_order }),
      collection,
      site.id,
    ).eq("id", target.id),
  ]);

  afterWrite(collection);
}
