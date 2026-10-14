/**
 * Template-level structure — the things that define *this* template rather than
 * an individual supplier's content. Anything a customer would want to change
 * lives in the database and is edited from /admin instead.
 */

/** Main navigation. Anchors into homepage sections. */
export const NAV_LINKS = [
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#industries", label: "Industries" },
  { href: "/#quality", label: "Quality" },
  { href: "/#equipment", label: "Equipment" },
  { href: "/#engineering", label: "Engineering" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#resources", label: "Resources" },
  { href: "/#careers", label: "Careers" },
  { href: "/#financing", label: "Business Growth", requiresFinancing: true },
];

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

/**
 * RFQ pipeline states, in order — mirrors the CRM stages a manufacturing quote
 * actually moves through, so the inbox matches how the sales desk works.
 */
export const LEAD_STATUSES = [
  { value: "new", label: "New RFQ", tone: "brand" },
  { value: "review", label: "Eng. Review", tone: "amber" },
  { value: "quoted", label: "Quoted", tone: "amber" },
  { value: "awarded", label: "Awarded", tone: "green" },
  { value: "production", label: "Production", tone: "green" },
  { value: "closed", label: "Closed", tone: "gray" },
];
