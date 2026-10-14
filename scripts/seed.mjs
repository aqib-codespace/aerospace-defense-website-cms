/**
 * Populates Supabase with this template's default content for one site.
 *
 * Multi-site aware: every row is stamped with the site_id of SITE_SLUG, and the
 * site is created if it doesn't exist. Running it with a different SITE_SLUG
 * onboards another supplier without touching the first.
 *
 * Safe to re-run: settings and content blocks are upserted, and collections are
 * only filled when that site's are empty (so it never duplicates real content).
 * Pass --force to clear and re-seed this site's collections.
 *
 * Run with: npm run db:seed
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import {
  DEFAULT_SETTINGS,
  DEFAULT_BLOCKS,
  DEFAULT_COLLECTIONS,
  DEFAULT_FAQS,
} from "../src/content/defaults.js";

const force = process.argv.includes("--force");

/** Read .env.local directly — this script runs outside Next.js. */
function readEnv() {
  try {
    return Object.fromEntries(
      readFileSync(new URL("../.env.local", import.meta.url), "utf8")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#"))
        .map((l) => {
          const i = l.indexOf("=");
          return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
        }),
    );
  } catch {
    return {};
  }
}

const env = { ...readEnv(), ...process.env };

if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Missing Supabase credentials.\n" +
      "Copy .env.local.example to .env.local and fill in NEXT_PUBLIC_SUPABASE_URL and " +
      "SUPABASE_SERVICE_ROLE_KEY (Project Settings -> API), then run this again.",
  );
  process.exit(1);
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

/** Mirrors src/lib/supabase/tables.js — this script runs outside Next.js. */
const prefix = env.SUPABASE_TABLE_PREFIX?.trim() ?? "";
const t = (name) => `${prefix}${name}`;
const slug = env.SITE_SLUG?.trim() || "default";

function check(label, error) {
  if (error) {
    console.error(`x ${label}: ${error.message}`);
    if (error.message?.includes("does not exist") || error.code === "PGRST205") {
      console.error(
        "  Run supabase/schema.sql and supabase/migrations/010_aerospace_platform.sql\n" +
          "  in the Supabase SQL editor first.",
      );
    }
    process.exit(1);
  }
  console.log(`ok ${label}`);
}

// --- The site row -------------------------------------------------------------
let siteId;
{
  const { data: existing, error: readError } = await supabase
    .from(t("sites"))
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  check(`sites (lookup "${slug}")`, readError);

  if (existing) {
    siteId = existing.id;
    console.log(`   -> existing site #${siteId}`);
  } else {
    const { data: created, error: insertError } = await supabase
      .from(t("sites"))
      .insert({ slug, name: DEFAULT_SETTINGS.company })
      .select("id")
      .single();
    check(`sites (create "${slug}")`, insertError);
    siteId = created.id;
    console.log(`   -> created site #${siteId}`);
  }
}

console.log(`\nSeeding site "${slug}"${prefix ? ` in ${prefix}* tables` : ""}...\n`);

// --- Settings -----------------------------------------------------------------
{
  const s = DEFAULT_SETTINGS;
  const { error } = await supabase.from(t("site_settings")).upsert(
    {
      site_id: siteId,
      // `name` is a legacy NOT NULL column from another template that shares
      // this table. It has no meaning here, so it mirrors the company name.
      name: s.company,
      company: s.company,
      tagline: s.tagline,
      logo_url: s.logoUrl || null,
      phone: s.phone,
      email: s.email,
      address_line1: s.addressLine1,
      address_line2: s.addressLine2,
      map_embed_url: s.mapEmbedUrl || null,
      schedule_url: s.scheduleUrl,
      brand_color: s.brandColor,
      accent_color: s.accentColor,
      meta_title: s.metaTitle,
      meta_description: s.metaDescription,
      site_url: s.siteUrl,
      social_links: s.socialLinks,
      financing_enabled: s.financingEnabled,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "site_id" },
  );
  check("site_settings", error);
}

// --- Content blocks -----------------------------------------------------------
{
  const rows = Object.entries(DEFAULT_BLOCKS).map(([key, data]) => ({
    site_id: siteId,
    key,
    data,
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase
    .from(t("content_blocks"))
    .upsert(rows, { onConflict: "site_id,key" });
  check(`content_blocks (${rows.length})`, error);
}

// --- Collections (all in the shared jsonb table) ------------------------------
async function seedCollection(name, items) {
  const table = t("collection_items");

  const { count, error: countError } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("site_id", siteId)
    .eq("collection", name);
  check(`${name} (read)`, countError);

  if (count > 0 && !force) {
    console.log(`-  ${name}: ${count} existing row(s), skipped (--force to replace)`);
    return;
  }

  if (count > 0) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("site_id", siteId)
      .eq("collection", name);
    check(`${name} (clear)`, error);
  }

  const { error } = await supabase.from(table).insert(
    items.map((data, index) => ({
      site_id: siteId,
      collection: name,
      data,
      sort_order: (index + 1) * 10,
    })),
  );
  check(`${name} (${items.length})`, error);
}

for (const [name, items] of Object.entries(DEFAULT_COLLECTIONS)) {
  await seedCollection(name, items);
}

// --- FAQs (typed table, shared with the other sites) -------------------------
{
  const table = t("faqs");
  const { count, error: countError } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("site_id", siteId);
  check("faqs (read)", countError);

  if (count > 0 && !force) {
    console.log(`-  faqs: ${count} existing row(s), skipped (--force to replace)`);
  } else {
    if (count > 0) {
      const { error } = await supabase.from(table).delete().eq("site_id", siteId);
      check("faqs (clear)", error);
    }
    const { error } = await supabase.from(table).insert(
      DEFAULT_FAQS.map((faq, index) => ({
        site_id: siteId,
        question: faq.question,
        answer: faq.answer,
        sort_order: (index + 1) * 10,
      })),
    );
    check(`faqs (${DEFAULT_FAQS.length})`, error);
  }
}

console.log(
  `\nSeed complete for site "${slug}" (#${siteId}).\n` +
    `Make sure SITE_SLUG=${slug} is set in .env.local, then run \`npm run create-admin\`.\n` +
    "Photos point at /images/* in this repo — replace them with the plant's own\n" +
    "photography from the admin Media Library before launch.",
);
