/**
 * ---------------------------------------------------------------------------
 * COLLECTION REGISTRY
 * ---------------------------------------------------------------------------
 * One entry per repeatable list. The admin panel derives the list page, create
 * and edit forms, validation, reordering, and deletion from these descriptions —
 * there is no per-collection page or action.
 *
 * Two storage modes:
 *
 *   storage: "jsonb"  — rows live in the shared `collection_items` table as
 *                       (site_id, collection, data jsonb, sort_order). Adding a
 *                       collection needs NO migration, which is the whole point:
 *                       a new template can define its own lists on day one.
 *
 *   storage: "row"    — rows live in a dedicated typed table (used where one
 *                       already exists and is genuinely generic, e.g. `faqs`).
 *
 * Field descriptors must stay plain JSON — they cross into a client component.
 */
export const COLLECTIONS = [
  {
    slug: "capabilities",
    storage: "jsonb",
    collection: "capabilities",
    label: "Capabilities",
    singular: "Capability",
    icon: "Cog",
    description: "The capability cards on the homepage grid.",
    primaryField: "title",
    fields: [
      { name: "icon", type: "icon", label: "Icon" },
      { name: "title", type: "text", label: "Capability", max: 60 },
      { name: "description", type: "textarea", label: "Description", rows: 3, max: 220 },
      {
        name: "spec",
        type: "text",
        label: "Headline spec",
        help: "Shown in monospace on the card, e.g. ±0.0005 in or NADCAP.",
        max: 24,
      },
    ],
  },
  {
    slug: "industries",
    storage: "jsonb",
    collection: "industries",
    label: "Industries",
    singular: "Industry",
    icon: "Plane",
    description: "Markets and programs served.",
    primaryField: "title",
    fields: [
      { name: "icon", type: "icon", label: "Icon" },
      { name: "title", type: "text", label: "Industry", max: 60 },
      { name: "description", type: "textarea", label: "Description", rows: 2, max: 200 },
    ],
  },
  {
    slug: "equipment",
    storage: "jsonb",
    collection: "equipment",
    label: "Equipment",
    singular: "Machine",
    icon: "Factory",
    description: "Machine list with capacities, shown as a spec gallery.",
    primaryField: "name",
    fields: [
      { name: "name", type: "text", label: "Make and model", max: 80 },
      {
        name: "category",
        type: "text",
        label: "Category",
        help: "Groups the gallery, e.g. Vertical Mill, Inspection, Forming.",
        max: 40,
      },
      {
        name: "spec",
        type: "text",
        label: "Capacity / envelope",
        help: "e.g. 50 × 26 × 25 in, or Ø 25.5 in × 60 in.",
        max: 48,
      },
      { name: "note", type: "text", label: "Notable detail", max: 80, optional: true },
      { name: "image", type: "image", label: "Photo", optional: true },
    ],
  },
  {
    slug: "certifications",
    storage: "jsonb",
    collection: "certifications",
    label: "Certifications",
    singular: "Certification",
    icon: "BadgeCheck",
    description: "Approvals and registrations, shown as a badge wall.",
    primaryField: "code",
    fields: [
      { name: "icon", type: "icon", label: "Icon" },
      {
        name: "code",
        type: "text",
        label: "Standard / code",
        help: "The short form buyers search for, e.g. AS9100D or ITAR.",
        max: 24,
      },
      { name: "name", type: "text", label: "Full name", max: 80 },
      { name: "description", type: "textarea", label: "Scope note", rows: 2, max: 200 },
    ],
  },
  {
    slug: "case-studies",
    storage: "jsonb",
    collection: "case_studies",
    label: "Case Studies",
    singular: "Case Study",
    icon: "FileCheck",
    description: "Program results, published with customer permission.",
    primaryField: "title",
    fields: [
      { name: "industry", type: "text", label: "Industry", max: 40 },
      { name: "title", type: "text", label: "Headline result", max: 110 },
      { name: "challenge", type: "textarea", label: "Challenge", rows: 3, max: 400 },
      { name: "solution", type: "textarea", label: "Solution", rows: 3, max: 400 },
      {
        name: "process",
        type: "text",
        label: "Processes used",
        help: "Separate with · e.g. 5-Axis Machining · CMM Inspection",
        max: 120,
      },
      { name: "result", type: "textarea", label: "Measured result", rows: 3, max: 400 },
      { name: "image", type: "image", label: "Photo", optional: true },
    ],
  },
  {
    slug: "resources",
    storage: "jsonb",
    collection: "resources",
    label: "Resources",
    singular: "Resource",
    icon: "FileText",
    description: "Downloadable guides and reference documents.",
    primaryField: "title",
    fields: [
      {
        name: "type",
        type: "select",
        label: "Type",
        options: [
          { value: "Capability", label: "Capability" },
          { value: "Guide", label: "Guide" },
          { value: "Reference", label: "Reference" },
          { value: "White Paper", label: "White Paper" },
          { value: "Article", label: "Article" },
        ],
      },
      { name: "title", type: "text", label: "Title", max: 110 },
      { name: "description", type: "textarea", label: "Summary", rows: 3, max: 260 },
      { name: "meta", type: "text", label: "Format", help: "e.g. PDF · 12 pages", max: 40 },
      {
        name: "url",
        type: "text",
        label: "File or link URL",
        help: "Upload the PDF in the Media Library, then paste its URL here. Leave empty to show a request-by-email link.",
        max: 500,
        optional: true,
      },
    ],
  },
  {
    slug: "positions",
    storage: "jsonb",
    collection: "positions",
    label: "Open Positions",
    singular: "Position",
    icon: "Users",
    description: "Job openings listed in the careers section.",
    primaryField: "title",
    fields: [
      { name: "title", type: "text", label: "Job title", max: 80 },
      { name: "department", type: "text", label: "Department", max: 40 },
      { name: "location", type: "text", label: "Location", max: 60 },
      {
        name: "type",
        type: "select",
        label: "Employment type",
        options: ["Full-time", "Part-time", "Apprenticeship", "Contract"],
      },
      { name: "description", type: "textarea", label: "Summary", rows: 3, max: 300 },
      {
        name: "applyUrl",
        type: "text",
        label: "Application link",
        help: "Leave empty to point applicants at the contact form.",
        max: 400,
        optional: true,
      },
    ],
  },
  {
    slug: "faqs",
    storage: "row",
    table: "faqs",
    label: "FAQs",
    singular: "Question",
    icon: "CircleQuestionMark",
    description: "Accordion questions. These also feed the FAQ structured data.",
    primaryField: "question",
    fields: [
      { name: "question", type: "text", label: "Question", max: 180 },
      { name: "answer", type: "textarea", label: "Answer", rows: 6, max: 1600 },
    ],
  },
];

export function getCollection(slug) {
  return COLLECTIONS.find((collection) => collection.slug === slug) ?? null;
}
