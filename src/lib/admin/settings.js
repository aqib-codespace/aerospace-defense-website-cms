/**
 * Site settings, described the same way as blocks and collections so the
 * Settings screen reuses the generated form. Names are the `site_settings`
 * columns (mode "row").
 *
 * Brand colour and accent colour are the two values that rebrand the entire
 * template: they are injected onto :root in src/app/layout.js and every other
 * shade in globals.css derives from them with color-mix().
 *
 * The capability statement is deliberately NOT a setting — it is a row in the
 * Resources collection with type "Capability", so the document, its description,
 * and its download link stay in one place.
 */
export const SETTINGS_FIELDS = [
  { name: "company", type: "text", label: "Company name", max: 80 },
  {
    name: "tagline",
    type: "text",
    label: "Qualifier line",
    help: "Sits under the company name in monospace. Certifications work well, e.g. \"AS9100D · ITAR Registered\".",
    max: 60,
  },
  {
    name: "logo",
    type: "image",
    column: "logo_url",
    label: "Logo",
    noAlt: true,
    optional: true,
    help: "Leave empty to use the generated brand mark, which follows your brand colour.",
  },

  { name: "phone", type: "text", label: "Main line", max: 40 },
  { name: "email", type: "text", label: "RFQ email", max: 120 },
  { name: "address_line1", type: "text", label: "Address line 1", max: 120 },
  { name: "address_line2", type: "text", label: "Address line 2", help: "City, state, ZIP.", max: 120 },
  {
    name: "map_embed_url",
    type: "text",
    label: "Google Maps embed URL",
    help: "Maps → Share → Embed a map → copy the src=\"…\" URL. Leave empty to show a directions link instead.",
    max: 800,
    optional: true,
  },
  {
    name: "schedule_url",
    type: "text",
    label: "\"Request RFQ\" link",
    help: "Use #rfq to scroll to the form, or paste a full portal URL.",
    max: 400,
  },

  {
    name: "brand_color",
    type: "color",
    label: "Brand colour",
    help: "Buttons, labels, rules, badges, and the generated logo all derive from this.",
    max: 20,
  },
  {
    name: "accent_color",
    type: "color",
    label: "Accent colour",
    help: "Used sparingly: export-control notices, datum lines, and the financing call to action.",
    max: 20,
  },

  { name: "meta_title", type: "text", label: "Page title (SEO)", max: 130 },
  {
    name: "meta_description",
    type: "textarea",
    label: "Meta description (SEO)",
    rows: 3,
    max: 320,
    help: "Around 150–160 characters shows in full on Google.",
  },
  {
    name: "site_url",
    type: "text",
    label: "Site URL",
    help: "The public address — used for sitemaps, canonical URLs, and structured data.",
    max: 300,
  },

  {
    name: "social_links",
    type: "repeater",
    label: "Social links",
    itemLabel: "Link",
    optional: true,
    maxItems: 6,
    fields: [
      {
        name: "platform",
        type: "text",
        label: "Platform",
        max: 40,
        help: "LinkedIn, YouTube, and X get their icon automatically.",
      },
      { name: "url", type: "text", label: "URL", max: 400 },
    ],
  },

  {
    name: "financing_enabled",
    type: "toggle",
    label: "Show the Business Growth section",
    help: "Turns off the financing band and removes it from the menu and footer.",
    optional: true,
  },
];
