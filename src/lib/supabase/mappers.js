/**
 * Supabase/Postgres columns are snake_case; public components expect camelCase
 * props. These mappers keep that translation in one place.
 *
 * The admin panel deliberately works on raw rows instead — its forms are
 * generated from the column-level field registry in src/lib/admin/*, so it has
 * no need for the camelCase view.
 *
 * Collections stored as jsonb need no mapper at all: src/db/queries/content.js
 * flattens them to `{ id, ...data }`, and the keys inside `data` are already the
 * names the components use.
 */

export function mapAdmin(row) {
  return {
    id: row.id,
    // null means a cross-site operator account rather than one site's owner.
    siteId: row.site_id,
    email: row.email,
    name: row.name,
    passwordHash: row.password_hash,
    failedLoginAttempts: row.failed_login_attempts,
    lockedUntil: row.locked_until,
    createdAt: row.created_at,
    lastLoginAt: row.last_login_at,
  };
}

export function mapFaq(row) {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sort_order,
  };
}

export function mapSiteSettings(row) {
  return {
    siteId: row.site_id,
    company: row.company,
    tagline: row.tagline,
    logoUrl: row.logo_url,
    phone: row.phone,
    email: row.email,
    addressLine1: row.address_line1,
    addressLine2: row.address_line2,
    mapEmbedUrl: row.map_embed_url,
    scheduleUrl: row.schedule_url,
    brandColor: row.brand_color,
    accentColor: row.accent_color,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    siteUrl: row.site_url,
    socialLinks: row.social_links ?? [],
    financingEnabled: row.financing_enabled,
    updatedAt: row.updated_at,
  };
}

export function mapMedia(row) {
  return {
    id: row.id,
    filename: row.filename,
    url: row.url,
    altText: row.alt_text,
    width: row.width,
    height: row.height,
    sizeBytes: row.size_bytes,
    uploadedAt: row.uploaded_at,
  };
}

export function mapLead(row) {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    serviceNeeded: row.service_needed,
    comments: row.comments,
    status: row.status,
    createdAt: row.created_at,
    /** RFQ-specific fields: company, quantity, tolerance, material, timeline, NDA. */
    details: row.details ?? {},
    /** Storage path of an uploaded drawing, held in a PRIVATE bucket. */
    attachmentPath: row.attachment_path,
    attachmentName: row.attachment_name,
  };
}
