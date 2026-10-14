/**
 * ---------------------------------------------------------------------------
 * CONTENT BLOCK REGISTRY
 * ---------------------------------------------------------------------------
 * One entry per fixed page section. Each entry describes its fields, and the
 * admin panel generates the editor, the validation, and the save payload from
 * that description — there is no per-section page or action to write.
 *
 * Adding a section to the site is three steps: add a block here, add its
 * defaults to src/content/defaults.js, and read it in the page with
 * getContentBlock("your_key"). /admin picks it up automatically.
 *
 * Descriptors must stay plain JSON (no components, no functions): they are
 * passed from Server Components into the client-side form renderer.
 *
 * Field types: text · textarea · select · icon · image · list · repeater
 * Every field is required unless `optional: true`.
 */

const LABEL = {
  name: "label",
  type: "text",
  label: "Section label",
  help: "Small monospace marker above the heading.",
  max: 60,
  optional: true,
};

const HEADING = { name: "heading", type: "text", label: "Heading", max: 130 };

const BODY = {
  name: "body",
  type: "textarea",
  label: "Supporting text",
  rows: 3,
  max: 420,
};

/** Standard label + heading + body intro, used by most sections. */
const intro = (overrides = {}) => [LABEL, HEADING, { ...BODY, ...overrides }];

const ICON = { name: "icon", type: "icon", label: "Icon" };

const featureFields = [
  ICON,
  { name: "title", type: "text", label: "Title", max: 70 },
  { name: "description", type: "textarea", label: "Description", rows: 3, max: 240 },
];

const specFields = [
  { name: "label", type: "text", label: "Label", max: 40 },
  { name: "value", type: "text", label: "Value", max: 40 },
];

export const BLOCKS = [
  {
    key: "hero",
    label: "Hero",
    icon: "LayoutTemplate",
    group: "Homepage",
    description: "First screen: headline, both calls to action, background photo, and headline metrics.",
    fields: [
      {
        ...LABEL,
        help: "Compliance strip above the headline, e.g. \"AS9100D · ITAR Registered · CAGE 8J4K2\".",
        max: 90,
      },
      { name: "headline", type: "text", label: "Headline", max: 90 },
      { name: "subheadline", type: "textarea", label: "Subheadline", rows: 3, max: 280 },
      { name: "primaryCtaLabel", type: "text", label: "Primary button", max: 40 },
      {
        name: "secondaryCtaLabel",
        type: "text",
        label: "Secondary button",
        help: "Downloads the capability statement set in Settings.",
        max: 44,
      },
      {
        name: "image",
        type: "image",
        label: "Background photo",
        help: "Darker, wider shots read best behind the headline.",
      },
      {
        name: "stats",
        type: "repeater",
        label: "Headline metrics",
        help: "Four reads best. Numeric values count up when scrolled into view.",
        itemLabel: "Metric",
        maxItems: 4,
        fields: specFields,
      },
    ],
  },
  {
    key: "trust_bar",
    label: "Compliance Strip",
    icon: "ShieldCheck",
    group: "Homepage",
    description: "The scrolling band of certifications directly under the hero.",
    fields: [
      { ...HEADING, label: "Lead-in line", max: 120, optional: true },
      {
        name: "items",
        type: "list",
        label: "Approvals",
        help: "Eight or more keeps the scrolling band full.",
        placeholder: "AS9100D Certified",
        minItems: 1,
      },
    ],
  },
  {
    key: "capabilities_intro",
    label: "Capabilities Intro",
    icon: "Cog",
    group: "Homepage",
    description: "Heading above the capability grid. The cards live in Capabilities.",
    fields: intro(),
  },
  {
    key: "industries_intro",
    label: "Industries Intro",
    icon: "Plane",
    group: "Homepage",
    description: "Heading above the industries grid. The entries live in Industries.",
    fields: intro(),
  },
  {
    key: "why_us",
    label: "Why Choose Us",
    icon: "Award",
    group: "Homepage",
    description: "The differentiators row.",
    fields: [
      ...intro(),
      {
        name: "features",
        type: "repeater",
        label: "Differentiators",
        itemLabel: "Item",
        minItems: 1,
        maxItems: 8,
        fields: featureFields,
      },
    ],
  },
  {
    key: "process",
    label: "Manufacturing Process",
    icon: "Route",
    group: "Homepage",
    description: "The staged path from drawing to delivery.",
    fields: [
      ...intro(),
      {
        name: "steps",
        type: "repeater",
        label: "Stages",
        help: "Eight fits the desktop rail in two rows of four.",
        itemLabel: "Stage",
        minItems: 1,
        maxItems: 10,
        fields: [
          { name: "title", type: "text", label: "Stage", max: 40 },
          { name: "description", type: "textarea", label: "Exit criteria", rows: 2, max: 180 },
        ],
      },
    ],
  },
  {
    key: "quality",
    label: "Quality System",
    icon: "ClipboardCheck",
    group: "Homepage",
    description: "Quality system narrative, control points, and the audit spec table.",
    fields: [
      ...intro({ max: 500 }),
      {
        name: "points",
        type: "repeater",
        label: "Control points",
        itemLabel: "Control",
        minItems: 1,
        maxItems: 8,
        fields: featureFields,
      },
      {
        name: "specs",
        type: "repeater",
        label: "Quality specifications",
        help: "Rendered as a datasheet table. Keep values short.",
        itemLabel: "Spec",
        maxItems: 8,
        fields: specFields,
      },
    ],
  },
  {
    key: "equipment_intro",
    label: "Equipment Intro",
    icon: "Factory",
    group: "Homepage",
    description: "Heading above the machine list. Machines live in Equipment.",
    fields: intro(),
  },
  {
    key: "certifications_intro",
    label: "Certifications Intro",
    icon: "BadgeCheck",
    group: "Homepage",
    description: "Heading above the badge wall. Entries live in Certifications.",
    fields: intro(),
  },
  {
    key: "case_studies_intro",
    label: "Case Studies Intro",
    icon: "FileCheck",
    group: "Homepage",
    description: "Heading above the case study cards.",
    fields: intro(),
  },
  {
    key: "engineering",
    label: "Engineering Services",
    icon: "DraftingCompass",
    group: "Homepage",
    description: "Engineering support offered alongside manufacturing.",
    fields: [
      ...intro(),
      {
        name: "services",
        type: "repeater",
        label: "Services",
        itemLabel: "Service",
        minItems: 1,
        maxItems: 8,
        fields: featureFields,
      },
    ],
  },
  {
    key: "facility",
    label: "Facility",
    icon: "Warehouse",
    group: "Homepage",
    description: "Plant overview with a photo and facility specifications.",
    fields: [
      ...intro(),
      { name: "image", type: "image", label: "Facility photo" },
      {
        name: "specs",
        type: "repeater",
        label: "Facility specifications",
        itemLabel: "Spec",
        maxItems: 8,
        fields: specFields,
      },
    ],
  },
  {
    key: "resources_intro",
    label: "Resources Intro",
    icon: "FileText",
    group: "Homepage",
    description: "Heading above the resource library. Documents live in Resources.",
    fields: intro(),
  },
  {
    key: "careers",
    label: "Careers",
    icon: "Users",
    group: "Homepage",
    description: "Recruitment section. Open roles live in Open Positions.",
    fields: [
      ...intro(),
      {
        name: "benefits",
        type: "list",
        label: "Benefits",
        placeholder: "Paid apprenticeship and tuition support",
        optional: true,
      },
      { name: "ctaLabel", type: "text", label: "Button label", max: 40, optional: true },
      { name: "ctaHref", type: "text", label: "Button link", max: 300, optional: true },
      { name: "image", type: "image", label: "Photo" },
    ],
  },
  {
    key: "financing",
    label: "Business Growth",
    icon: "Landmark",
    group: "Homepage",
    description: "Financing module for owners. Switch the whole section off in Settings.",
    fields: [
      ...intro({ max: 600 }),
      {
        name: "bullets",
        type: "list",
        label: "Qualifying uses",
        placeholder: "Equipment purchases — machining centres, CMM, automation",
        optional: true,
      },
      { name: "ctaLabel", type: "text", label: "Button label", max: 60 },
      {
        name: "ctaHref",
        type: "text",
        label: "Button link",
        help: "An anchor like #rfq, or a full https:// URL to a lender's form.",
        max: 300,
      },
      { name: "image", type: "image", label: "Photo" },
    ],
  },
  {
    key: "faq_intro",
    label: "FAQ Intro",
    icon: "CircleQuestionMark",
    group: "Homepage",
    description: "Heading beside the FAQ accordion. Questions live in FAQs.",
    fields: intro(),
  },
  {
    key: "contact",
    label: "RFQ Section",
    icon: "Inbox",
    group: "Homepage",
    description: "RFQ form copy, export-control notice, and the contact directory.",
    fields: [
      ...intro({ max: 320 }),
      {
        name: "exportNotice",
        type: "textarea",
        label: "Export-control notice",
        help: "Shown prominently above the upload field. Reviewed by your compliance officer.",
        rows: 4,
        max: 600,
      },
      {
        name: "formNote",
        type: "textarea",
        label: "Fine print under the button",
        rows: 2,
        max: 320,
        optional: true,
      },
      {
        name: "successMessage",
        type: "textarea",
        label: "Confirmation message",
        rows: 2,
        max: 260,
      },
      {
        name: "contacts",
        type: "repeater",
        label: "Contact directory",
        itemLabel: "Entry",
        minItems: 1,
        maxItems: 6,
        fields: specFields,
      },
      {
        name: "serviceOptions",
        type: "list",
        label: "\"Service required\" options",
        help: "The dropdown choices on the RFQ form.",
        placeholder: "5-Axis Machining",
        minItems: 1,
      },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    icon: "PanelBottom",
    group: "Site-wide",
    description: "Footer blurb, column headings, and the registration note.",
    fields: [
      { name: "about", type: "textarea", label: "About blurb", rows: 3, max: 340 },
      { name: "capabilitiesHeading", type: "text", label: "Column 1 heading", max: 30 },
      { name: "industriesHeading", type: "text", label: "Column 2 heading", max: 30 },
      { name: "companyHeading", type: "text", label: "Column 3 heading", max: 30 },
      {
        name: "legalNote",
        type: "textarea",
        label: "Registration note",
        help: "CAGE code, DUNS, SAM status, trademark note.",
        rows: 3,
        max: 400,
        optional: true,
      },
    ],
  },
  {
    key: "legal_privacy",
    label: "Privacy Policy",
    icon: "Lock",
    group: "Site-wide",
    description: "The /privacy page.",
    fields: [
      HEADING,
      { name: "updatedAt", type: "text", label: "Last updated", max: 40, optional: true },
      {
        name: "body",
        type: "textarea",
        label: "Policy text",
        help: "Leave a blank line between paragraphs.",
        rows: 16,
        max: 20000,
      },
    ],
  },
  {
    key: "legal_terms",
    label: "Terms of Use",
    icon: "Scale",
    group: "Site-wide",
    description: "The /terms page.",
    fields: [
      HEADING,
      { name: "updatedAt", type: "text", label: "Last updated", max: 40, optional: true },
      {
        name: "body",
        type: "textarea",
        label: "Terms text",
        help: "Leave a blank line between paragraphs.",
        rows: 16,
        max: 20000,
      },
    ],
  },
];

export function getBlock(key) {
  return BLOCKS.find((block) => block.key === key) ?? null;
}

/** [{ heading, blocks }] for the sidebar, preserving registry order. */
export const BLOCK_GROUPS = BLOCKS.reduce((groups, block) => {
  const existing = groups.find((group) => group.heading === block.group);
  if (existing) existing.blocks.push(block);
  else groups.push({ heading: block.group, blocks: [block] });
  return groups;
}, []);
