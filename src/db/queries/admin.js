import "server-only";
import { cache } from "react";
import { requireSupabase } from "@/lib/supabase/client";
import { TABLES } from "@/lib/supabase/tables";
import { mapMedia, mapLead } from "@/lib/supabase/mappers";
import { requireAdmin } from "@/lib/auth/dal";
import { requireSite } from "@/lib/site";
import { COLLECTIONS, getCollection } from "@/lib/admin/collections";
import { tableFor, scoped } from "@/lib/admin/storage";
import { BLOCKS } from "@/lib/admin/blocks";

/**
 * Admin-only reads. Each independently re-verifies the session (defence in depth
 * on top of the calling page's requireAdmin()) — cache() collapses this to one
 * check per request either way.
 *
 * Table names always come from the registries, never from a URL segment, so a
 * crafted /admin/collections/<anything> cannot reach an unintended table.
 *
 * Every read is filtered by the active site. Unlike the public readers, these
 * throw when the site can't be resolved: showing an admin an empty list would
 * invite them to "fix" it by re-entering content that already exists.
 */

function resolve(slug) {
  const collection = getCollection(slug);
  if (!collection) throw new Error(`Unknown collection: ${slug}`);
  return collection;
}

export const getCollectionRows = cache(async (slug) => {
  await requireAdmin();
  const supabase = requireSupabase();
  const site = await requireSite();
  const collection = resolve(slug);

  const { data, error } = await scoped(
    supabase.from(tableFor(collection)).select("*"),
    collection,
    site.id,
  )
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  if (error) throw error;
  return data ?? [];
});

export const getCollectionRow = cache(async (slug, id) => {
  await requireAdmin();
  const supabase = requireSupabase();
  const site = await requireSite();
  const collection = resolve(slug);

  const { data, error } = await scoped(
    supabase.from(tableFor(collection)).select("*"),
    collection,
    site.id,
  )
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
});

export const getContentBlockAdmin = cache(async (key) => {
  await requireAdmin();
  const supabase = requireSupabase();
  const site = await requireSite();

  const { data, error } = await supabase
    .from(TABLES.contentBlocks)
    .select("data, updated_at")
    .eq("site_id", site.id)
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
});

export const getSiteSettingsAdmin = cache(async () => {
  await requireAdmin();
  const supabase = requireSupabase();
  const site = await requireSite();

  const { data, error } = await supabase
    .from(TABLES.siteSettings)
    .select("*")
    .eq("site_id", site.id)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
});

export const getAllMedia = cache(async () => {
  await requireAdmin();
  const supabase = requireSupabase();
  const site = await requireSite();

  const { data, error } = await supabase
    .from(TABLES.media)
    .select("*")
    .eq("site_id", site.id)
    .order("uploaded_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapMedia);
});

export const getLeads = cache(async (status) => {
  await requireAdmin();
  const supabase = requireSupabase();
  const site = await requireSite();

  let query = supabase
    .from(TABLES.leads)
    .select("*")
    .eq("site_id", site.id)
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapLead);
});

export const getNewLeadCount = cache(async () => {
  await requireAdmin();
  const supabase = requireSupabase();
  const site = await requireSite();

  const { count, error } = await supabase
    .from(TABLES.leads)
    .select("id", { count: "exact", head: true })
    .eq("site_id", site.id)
    .eq("status", "new");
  if (error) throw error;
  return count ?? 0;
});

/**
 * Counts for the dashboard tiles. Collection counts are derived from the
 * registry rather than hardcoded, so a new collection appears on the dashboard
 * the moment it is registered.
 */
export const getDashboardStats = cache(async () => {
  await requireAdmin();
  const supabase = requireSupabase();
  const site = await requireSite();

  const countCollection = async (collection) => {
    const { count, error } = await scoped(
      supabase.from(tableFor(collection)).select("id", { count: "exact", head: true }),
      collection,
      site.id,
    );
    if (error) throw error;
    return [collection.slug, count ?? 0];
  };

  const countTable = async (name, filter) => {
    let query = supabase
      .from(name)
      .select("id", { count: "exact", head: true })
      .eq("site_id", site.id);
    if (filter) query = query.eq(filter.column, filter.value);
    const { count, error } = await query;
    if (error) throw error;
    return count ?? 0;
  };

  const [collectionCounts, newLeads, totalLeads, media] = await Promise.all([
    Promise.all(COLLECTIONS.map(countCollection)),
    countTable(TABLES.leads, { column: "status", value: "new" }),
    countTable(TABLES.leads),
    countTable(TABLES.media),
  ]);

  return {
    collections: Object.fromEntries(collectionCounts),
    newLeads,
    totalLeads,
    media,
    blocks: BLOCKS.length,
  };
});

export const getRecentActivity = cache(async (limit = 8) => {
  await requireAdmin();
  const supabase = requireSupabase();
  const site = await requireSite();

  const { data, error } = await supabase
    .from(TABLES.auditLog)
    .select("*")
    .eq("site_id", site.id)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
});
