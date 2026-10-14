import "server-only";
import { TABLES, table } from "@/lib/supabase/tables";
import { parseFields, rowToDefaults } from "@/lib/admin/parse";

/**
 * ---------------------------------------------------------------------------
 * ONE PLACE THAT KNOWS HOW A COLLECTION IS STORED
 * ---------------------------------------------------------------------------
 * Collections live either in the shared `collection_items` table as jsonb, or in
 * a dedicated typed table. Every read, write, and form-default path goes through
 * the helpers below, so the admin pages and actions never branch on storage
 * themselves — which is what keeps adding a collection a registry-only change.
 */

export const isJsonb = (collection) => collection.storage === "jsonb";

/** The physical table a collection reads and writes. */
export function tableFor(collection) {
  return isJsonb(collection) ? TABLES.collectionItems : table(collection.table);
}

/**
 * Extra equality filters a query needs beyond site_id. jsonb collections share
 * one table, so they must also filter on the collection name.
 */
export function scopeFor(collection) {
  return isJsonb(collection) ? { collection: collection.collection } : {};
}

/** Applies site + collection scoping to a Supabase query builder. */
export function scoped(query, collection, siteId) {
  let next = query.eq("site_id", siteId);
  for (const [column, value] of Object.entries(scopeFor(collection))) {
    next = next.eq(column, value);
  }
  return next;
}

/** Reads one field from a stored row, whichever shape it is in. */
export function fieldValue(collection, row, field) {
  if (isJsonb(collection)) return row?.data?.[field.name];
  if (field.type === "image") {
    return {
      src: row?.[field.column ?? `${field.name}_url`] ?? "",
      alt: row?.[field.altColumn ?? `${field.name}_alt`] ?? "",
    };
  }
  return row?.[field.column ?? field.name];
}

/** Convenience for list pages, which only know a field *name*. */
export function namedValue(collection, row, name) {
  if (isJsonb(collection)) return row?.data?.[name];
  return row?.[name];
}

/** The `defaults` map the generated form expects, for the edit screen. */
export function formDefaults(collection, row) {
  return isJsonb(collection) ? (row?.data ?? {}) : rowToDefaults(collection.fields, row);
}

/**
 * Parses a submission into the columns to write.
 *
 * jsonb collections reuse the nested "block" parser, because the shape it
 * produces — `{ title, description, image: { src, alt } }` — is exactly what
 * belongs in the `data` column.
 */
export function parseSubmission(collection, formData) {
  const mode = isJsonb(collection) ? "block" : "row";
  const { data, errors, ok } = parseFields(collection.fields, formData, { mode });
  if (!ok) return { errors, ok: false };

  return {
    ok: true,
    values: isJsonb(collection)
      ? { collection: collection.collection, data }
      : data,
  };
}
