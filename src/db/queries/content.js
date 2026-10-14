import "server-only";
import { cache } from "react";
import { supabase } from "@/lib/supabase/client";
import { TABLES, table } from "@/lib/supabase/tables";
import { getActiveSite } from "@/lib/site";
import { reportOnce } from "@/lib/log";
import { mapSiteSettings, mapFaq } from "@/lib/supabase/mappers";
import { getCollection } from "@/lib/admin/collections";
import {
  DEFAULT_SETTINGS,
  DEFAULT_BLOCKS,
  DEFAULT_COLLECTIONS,
  DEFAULT_FAQS,
} from "@/content/defaults";

/**
 * Public, unauthenticated readers for the marketing site. Deliberately kept
 * separate from the admin query/mutation modules so this file never accidentally
 * grows a requireAdmin() call that would auth-gate the homepage. Each is
 * React-cache()-wrapped so repeated calls within one request collapse into one
 * query.
 *
 * ---------------------------------------------------------------------------
 * FAILURE POLICY
 * ---------------------------------------------------------------------------
 * These readers never throw. If the database is unreachable or a migration
 * hasn't run, they fall back to src/content/defaults.js and log the fix once.
 * A supplier's site going blank costs them RFQs; serving last-known-good copy
 * does not. The admin panel takes the opposite stance and surfaces errors.
 *
 * ---------------------------------------------------------------------------
 * SITE SCOPING
 * ---------------------------------------------------------------------------
 * Every table is shared with the other sites in this Supabase project, so each
 * read is filtered by the active site's id. That filter is applied here, once
 * per reader, rather than being left to call sites.
 */

function reportFailure(label, error) {
  const hints = {
    "42P01": "Run supabase/schema.sql in the Supabase SQL editor.",
    PGRST205:
      "Run supabase/schema.sql (and migrations/010_aerospace_platform.sql) in the Supabase SQL " +
      "editor, and check that SUPABASE_TABLE_PREFIX matches the table names it creates.",
  };

  reportOnce(
    `cms:${label}`,
    `[cms] ${label} failed — serving bundled default content instead.\n` +
      `      ${error?.message ?? error}` +
      (hints[error?.code] ? `\n      Fix: ${hints[error.code]}` : ""),
  );
}

async function read(label, fallback, run) {
  if (!supabase) return fallback;

  const site = await getActiveSite();
  if (!site) return fallback;

  try {
    const { data, error } = await run(site.id);
    if (error) throw error;
    return data;
  } catch (error) {
    reportFailure(label, error);
    return fallback;
  }
}

export const getSiteSettings = cache(async () => {
  const row = await read("site_settings", null, (siteId) =>
    supabase.from(TABLES.siteSettings).select("*").eq("site_id", siteId).maybeSingle(),
  );
  return row ? mapSiteSettings(row) : DEFAULT_SETTINGS;
});

export const getContentBlock = cache(async (key) => {
  const row = await read(`content_blocks (${key})`, null, (siteId) =>
    supabase
      .from(TABLES.contentBlocks)
      .select("data")
      .eq("site_id", siteId)
      .eq("key", key)
      .maybeSingle(),
  );
  return row?.data ?? DEFAULT_BLOCKS[key] ?? null;
});

/** Collection defaults need stable keys for React; rows get theirs from Postgres. */
const withIds = (items) => items.map((item, index) => ({ ...item, id: `default-${index}` }));

/**
 * Reads any registered collection, whichever way it is stored.
 *
 * jsonb collections are flattened to `{ id, ...data }` so components receive
 * plain props and never have to know the row had a `data` column.
 */
export const getCollectionItems = cache(async (slug) => {
  const collection = getCollection(slug);
  if (!collection) return [];

  const jsonb = collection.storage === "jsonb";
  const fallback = jsonb
    ? withIds(DEFAULT_COLLECTIONS[collection.collection] ?? [])
    : withIds(DEFAULT_FAQS);

  const rows = await read(`collection (${slug})`, null, (siteId) => {
    const query = supabase
      .from(jsonb ? TABLES.collectionItems : table(collection.table))
      .select("*")
      .eq("site_id", siteId);

    return (jsonb ? query.eq("collection", collection.collection) : query).order("sort_order", {
      ascending: true,
    });
  });

  if (!rows?.length) return fallback;
  return jsonb ? rows.map((row) => ({ id: row.id, ...row.data })) : rows.map(mapFaq);
});
