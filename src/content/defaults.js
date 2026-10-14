/**
 * Every word, figure, and image path the template ships with.
 *
 * This file has two jobs, which is why it is plain data with zero imports:
 *
 *   1. `scripts/seed.mjs` imports it to populate a site in Supabase.
 *   2. `src/db/queries/content.js` falls back to it when the database is
 *      unreachable, so a fresh clone renders a complete site with no setup.
 *
 * Copy is written the way a procurement engineer reads: specific tolerances,
 * named standards, no adjectives that cannot be verified. Placeholder figures
 * are realistic for a Tier-2 aerospace supplier and must be replaced with the
 * shop's audited numbers before launch.
 */

export const DEFAULT_SETTINGS = {
  company: "Arcline Precision",
  tagline: "AS9100D · ITAR Registered",
  logoUrl: "",
  phone: "(316) 555-0184",
  email: "rfq@arclineprecision.com",
  addressLine1: "4180 Aerodyne Parkway",
  addressLine2: "Wichita, KS 67209",
  mapEmbedUrl: "",
  scheduleUrl: "#rfq",
  brandColor: "#0E8F9E",
  accentColor: "#D98324",
  metaTitle: "Aerospace & Defense Manufacturing | Precision CNC & Engineering",
  metaDescription:
    "Precision aerospace manufacturing, CNC machining, engineering support, and defense manufacturing for mission-critical applications. Request an RFQ today.",
  siteUrl: "http://localhost:3000",
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "YouTube", url: "https://youtube.com" },
  ],
  financingEnabled: true,
};

export const DEFAULT_BLOCKS = {
  hero: {
    label: "AS9100D · ITAR Registered · CAGE 8J4K2",
    headline: "Engineering Precision. Manufacturing Confidence.",
    subheadline:
      "High-precision aerospace and defense manufacturing built to exact specifications for mission-critical applications.",
    primaryCtaLabel: "Request RFQ",
    secondaryCtaLabel: "Download Capability Statement",
    image: {
      src: "/images/hero-machining.jpg",
      alt: "Five-axis machining centre cutting an aerospace bracket under coolant",
    },
    stats: [
      { value: "±0.0002", label: "Inch positional tolerance" },
      { value: "42", label: "CNC machining centres" },
      { value: "99.6%", label: "On-time delivery, trailing 12 mo" },
      { value: "24", label: "Hour RFQ response" },
    ],
  },

  trust_bar: {
    heading: "Qualified for regulated, mission-critical production",
    items: [
      "AS9100D Certified",
      "ISO 9001:2015",
      "ITAR Registered",
      "DFARS Compliant",
      "CMMC Level 2 Ready",
      "NIST SP 800-171",
      "Made in USA",
      "NADCAP Processes",
    ],
  },

  capabilities_intro: {
    label: "Capabilities",
    heading: "Complete build-to-print manufacturing under one roof",
    body: "Machining, fabrication, assembly, and inspection in a single controlled facility — which removes the schedule risk and traceability gaps that come with splitting a build across vendors.",
  },

  industries_intro: {
    label: "Industries",
    heading: "Programs we support",
    body: "Every industry below carries its own qualification, documentation, and export-control requirements. We hold the approvals and quality records each one demands.",
  },

  why_us: {
    label: "Why Arcline",
    heading: "Built for programs that cannot slip",
    body: "Four commitments that shape how every part number moves through the shop.",
    features: [
      {
        icon: "target",
        title: "Repeatability, not one-offs",
        description:
          "SPC on critical features, locked setups, and tool-life tracking so part 5,000 measures like part 1.",
      },
      {
        icon: "drafting",
        title: "Engineering at quote stage",
        description:
          "A manufacturing engineer reviews every drawing before pricing, so DFM issues surface in the quote rather than in production.",
      },
      {
        icon: "fingerprint",
        title: "Full material traceability",
        description:
          "Heat-lot traceability from mill certificate to shipped part, with records retained for the life of the program.",
      },
      {
        icon: "factory",
        title: "Domestic capacity that scales",
        description:
          "Prototype through 50,000-piece annual volumes on the same equipment, with no offshore transfer.",
      },
    ],
  },

  process: {
    label: "Process",
    heading: "From drawing to delivery",
    body: "Eight controlled stages, each with a defined exit gate. Nothing advances on assumption.",
    steps: [
      {
        title: "Engineering Review",
        description: "Drawing, GD&T, and spec review by a manufacturing engineer.",
      },
      { title: "RFQ", description: "Priced quote with lead time and tooling breakdown, within 24 hours." },
      { title: "DFM Review", description: "Documented recommendations where cost or risk can be reduced." },
      { title: "Prototype", description: "First articles machined on production intent processes." },
      { title: "Approval", description: "FAI per AS9102, submitted with full dimensional report." },
      { title: "Production", description: "Released to the floor with locked setups and travellers." },
      { title: "Inspection", description: "In-process and final CMM inspection against the released revision." },
      { title: "Delivery", description: "Kitted, serialised, and shipped with certifications attached." },
    ],
  },

  quality: {
    label: "Quality",
    heading: "A quality system built for audits, not for show",
    body: "Our AS9100D system governs every job on the floor. Records are retained, calibrated, and produced on request — including for customer and third-party audits.",
    points: [
      { icon: "microscope", title: "Inspection", description: "CMM, vision, and hand inspection to the released revision." },
      { icon: "fingerprint", title: "Traceability", description: "Heat lot to shipped part, retained for program life." },
      { icon: "file-check", title: "Documentation", description: "FAI, CoC, material certs, and inspection reports." },
      { icon: "scan", title: "Calibration", description: "Gauge control on a scheduled, documented cycle." },
      { icon: "clipboard", title: "Corrective Action", description: "Root cause analysis with verified closure." },
      { icon: "trending", title: "Continuous Improvement", description: "SPC trending reviewed monthly by engineering." },
    ],
    specs: [
      { label: "Quality standard", value: "AS9100D / ISO 9001:2015" },
      { label: "FAI standard", value: "AS9102 Rev B" },
      { label: "Inspection equipment", value: "Zeiss + Keyence CMM" },
      { label: "Record retention", value: "Program life + 10 yr" },
      { label: "PPM defect rate", value: "412 ppm" },
      { label: "Audit readiness", value: "Continuous" },
    ],
  },

  equipment_intro: {
    label: "Equipment",
    heading: "The machines behind the tolerances",
    body: "42 CNC centres across milling, turning, and multi-axis work, supported by a climate-controlled inspection lab.",
  },

  certifications_intro: {
    label: "Certifications",
    heading: "Approvals and registrations",
    body: "Current certificates are available on request, and included automatically in every supplier qualification package.",
  },

  case_studies_intro: {
    label: "Case Studies",
    heading: "Programs delivered",
    body: "Representative work, published with customer permission. Program names and drawings are withheld under NDA and export control.",
  },

  engineering: {
    label: "Engineering",
    heading: "Engineering support, included",
    body: "Our engineering group is part of the quote, not a separate line item. Most cost reduction happens before the first chip is cut.",
    services: [
      { icon: "drafting", title: "CAD / CAM Support", description: "Native and neutral formats; CAM programmed in-house." },
      { icon: "scan", title: "Reverse Engineering", description: "Scan-to-CAD for legacy parts with no usable drawing." },
      { icon: "rocket", title: "Rapid Prototyping", description: "Production-intent prototypes in as little as 5 days." },
      { icon: "ruler", title: "Tolerance Analysis", description: "Stack-up review before tooling is committed." },
      { icon: "atom", title: "Material Selection", description: "Alloy and finish guidance against service conditions." },
      { icon: "cog", title: "Value Engineering", description: "Cost-down proposals with documented trade-offs." },
    ],
  },

  facility: {
    label: "Facility",
    heading: "Inside the plant",
    body: "86,000 square feet in Wichita, Kansas — machining, fabrication, assembly, inspection, and controlled storage on one floor.",
    image: {
      src: "/images/facility-floor.jpg",
      alt: "Manufacturing floor with rows of CNC machining centres",
    },
    specs: [
      { label: "Facility size", value: "86,000 sq ft" },
      { label: "Location", value: "Wichita, KS (USA)" },
      { label: "Shifts", value: "3 / 5 days" },
      { label: "Controlled storage", value: "ITAR segregated" },
    ],
  },

  resources_intro: {
    label: "Resources",
    heading: "Engineering and procurement library",
    body: "Reference material written by our engineers — for specifying parts, qualifying suppliers, and passing audits.",
  },

  careers: {
    label: "Careers",
    heading: "Machinists and engineers build here",
    body: "We hire for judgment and train for process. Apprentices run production work within their first year, supervised on real part numbers.",
    benefits: [
      "Paid apprenticeship and tuition support",
      "Full medical, dental, and vision from day 31",
      "Quarterly production bonus, plant-wide",
      "Climate-controlled, organised shop floor",
      "Tool allowance and safety equipment provided",
    ],
    ctaLabel: "See open positions",
    ctaHref: "#careers",
    image: {
      src: "/images/careers-machinist.jpg",
      alt: "Machinist setting up a workholding fixture at a CNC machine",
    },
  },

  financing: {
    label: "Business Growth",
    heading: "Growing Your Manufacturing Operation?",
    body: "Whether you are purchasing equipment, expanding a facility, acquiring a building or another shop, or funding working capital against a new contract award, financing options may be available.",
    bullets: [
      "Equipment purchases — machining centres, CMM, automation",
      "Facility expansion, build-out, or relocation",
      "Owner-occupied commercial real estate (SBA 504)",
      "Working capital against awarded contracts",
      "Business acquisition and ownership transition (SBA 7(a))",
      "Government contract growth and mobilisation funding",
    ],
    ctaLabel: "Speak with a Manufacturing Finance Advisor",
    ctaHref: "#rfq",
    image: {
      src: "/images/financing-floor.jpg",
      alt: "New machining centre being commissioned on a plant floor",
    },
  },

  faq_intro: {
    label: "FAQ",
    heading: "Procurement and engineering questions",
    body: "If something here is not covered, an engineer will answer it directly — not a sales representative.",
  },

  contact: {
    label: "Request RFQ",
    heading: "Submit a drawing package",
    body: "Attach your drawing and we will return a priced, lead-timed quote within one business day. Engineering review is included at no charge.",
    formNote:
      "Uploaded drawings are stored in a private, access-controlled bucket and are never publicly reachable. Submitting this form does not constitute a contract.",
    successMessage:
      "RFQ received. An engineer will review the package and respond within one business day.",
    exportNotice:
      "Do not transmit classified information through this form. Technical data subject to ITAR or EAR should be shared only after an NDA and export-control review are in place — request one below and we will initiate it.",
    contacts: [
      { label: "RFQ / Quoting", value: "rfq@arclineprecision.com" },
      { label: "Supplier Quality", value: "quality@arclineprecision.com" },
      { label: "Main line", value: "(316) 555-0184" },
      { label: "Hours", value: "Mon–Fri, 07:00–17:00 CT" },
    ],
    serviceOptions: [
      "Precision CNC Machining",
      "5-Axis Machining",
      "Metal Fabrication",
      "Mechanical Assembly",
      "Prototype / First Article",
      "Production Run",
      "Inspection Services",
      "Kitting & Supply Chain",
      "Engineering Consultation",
      "Supplier Qualification",
    ],
  },

  footer: {
    about:
      "Arcline Precision is an AS9100D certified, ITAR registered contract manufacturer supplying machined and fabricated components to aerospace, defense, and space programs.",
    capabilitiesHeading: "Capabilities",
    industriesHeading: "Industries",
    companyHeading: "Company",
    legalNote:
      "CAGE 8J4K2 · DUNS 07-914-2210 · Registered in SAM.gov. All trademarks are the property of their respective owners. Specifications subject to change without notice.",
  },

  legal_privacy: {
    heading: "Privacy Policy",
    updatedAt: "January 2026",
    body: "This is placeholder policy text. Replace it from the admin panel with the privacy policy your company actually uses.\n\nWe collect the information you submit through our RFQ and supplier forms — company name, contact details, project descriptions, and any uploaded drawings — solely to prepare a quote and to perform the work you request.\n\nUploaded technical data is stored in a private, access-controlled location, is available only to personnel involved in quoting and production, and is retained according to our record retention schedule.\n\nWe do not sell personal information. To request a copy or deletion of information we hold about you, contact us using the details on this site.",
  },

  legal_terms: {
    heading: "Terms of Use",
    updatedAt: "January 2026",
    body: "This is placeholder terms text. Replace it from the admin panel with terms reviewed by your own counsel.\n\nContent on this website is provided for general information about our manufacturing capabilities. Capacities, tolerances, lead times, and certifications described here are representative and are not binding until confirmed in a written quotation.\n\nQuotations are subject to review of complete drawing packages and applicable specifications. Orders are accepted subject to our standard terms and conditions of sale.\n\nNothing on this website constitutes an offer to export controlled technical data. Transfers of ITAR or EAR controlled data occur only under executed agreements and applicable authorisations.",
  },
};

/**
 * Collections. Each entry becomes a row in the shared `collection_items` table
 * (site_id + collection + jsonb data), so adding a collection to a future
 * template needs a registry entry rather than a migration.
 */
export const DEFAULT_COLLECTIONS = {
  capabilities: [
    {
      icon: "cog",
      title: "Precision CNC Machining",
      description: "3- and 4-axis milling and turning in aluminium, stainless, titanium, and Inconel.",
      spec: "±0.0005 in",
    },
    {
      icon: "five-axis",
      title: "5-Axis Machining",
      description: "Single-setup machining of complex geometry, reducing stack-up and handling risk.",
      spec: "±0.0002 in",
    },
    {
      icon: "anvil",
      title: "Metal Fabrication",
      description: "Laser cutting, forming, and press brake work up to 10 ft with in-house tooling.",
      spec: "0.030–0.500 in",
    },
    {
      icon: "wrench",
      title: "Mechanical Assembly",
      description: "Sub-assembly and build-to-print integration with torque and continuity records.",
      spec: "Serialised",
    },
    {
      icon: "drafting",
      title: "Engineering Support",
      description: "DFM, tolerance analysis, and CAM programming included at quote stage.",
      spec: "In-house",
    },
    {
      icon: "rocket",
      title: "Rapid Prototyping",
      description: "Production-intent first articles in as little as five working days.",
      spec: "5 day",
    },
    {
      icon: "factory",
      title: "Production Runs",
      description: "Repeat volumes from 50 to 50,000 pieces annually on locked setups.",
      spec: "50–50k/yr",
    },
    {
      icon: "microscope",
      title: "Inspection Services",
      description: "CMM, vision, and surface measurement with full dimensional reporting.",
      spec: "AS9102",
    },
    {
      icon: "flame",
      title: "Finishing",
      description: "Anodise, chem film, passivation, plating, and paint through NADCAP sources.",
      spec: "NADCAP",
    },
    {
      icon: "test-tube",
      title: "Testing",
      description: "Hardness, pressure, and functional testing per customer specification.",
      spec: "Per spec",
    },
    {
      icon: "truck",
      title: "Supply Chain Support",
      description: "Managed stock, release schedules, and consigned inventory programs.",
      spec: "JIT / VMI",
    },
    {
      icon: "boxes",
      title: "Kitting",
      description: "Kitted, labelled, and serialised assemblies ready for line-side use.",
      spec: "Line-side",
    },
  ],

  industries: [
    { icon: "plane", title: "Commercial Aerospace", description: "Structural, interior, and engine-adjacent components for tier-one suppliers." },
    { icon: "shield-check", title: "Defense", description: "Ground, naval, and airborne platform hardware under ITAR and DFARS." },
    { icon: "satellite", title: "Space", description: "Launch and satellite structures where mass and traceability both matter." },
    { icon: "test-tube", title: "Medical", description: "Instrument and device components under documented process control." },
    { icon: "zap", title: "Energy", description: "Turbine, downhole, and power generation parts in high-temperature alloys." },
    { icon: "factory", title: "Industrial", description: "Automation, robotics, and capital equipment machined assemblies." },
    { icon: "scale", title: "Government", description: "Direct and subcontract work with prime contractors and agencies." },
    { icon: "circuit-board", title: "Semiconductor", description: "Ultra-clean, tight-tolerance components for process equipment." },
  ],

  equipment: [
    { name: "Mazak Integrex i-400", category: "Multi-Axis", spec: "Ø 25.5 in × 60 in", note: "Mill-turn, 5-axis simultaneous", image: { src: "/images/equipment-mill.jpg", alt: "Multi-axis mill-turn machining centre" } },
    { name: "Haas VF-5SS", category: "Vertical Mill", spec: "50 × 26 × 25 in", note: "12,000 rpm, high-speed machining", image: { src: "/images/equipment-vmc.jpg", alt: "Vertical machining centre with pallet setup" } },
    { name: "Zeiss Contura CMM", category: "Inspection", spec: "700 × 1000 × 600 mm", note: "Climate-controlled lab, 0.9 µm MPE", image: { src: "/images/equipment-cmm.jpg", alt: "Coordinate measuring machine in an inspection lab" } },
    { name: "Amada Ensis 3015 Fiber", category: "Fabrication", spec: "3 kW, 60 × 120 in", note: "Fiber laser cutting, nitrogen assist", image: { src: "/images/equipment-laser.jpg", alt: "Fiber laser cutting sheet metal" } },
    { name: "Trumpf TruBend 5170", category: "Forming", spec: "187 ton, 10 ft", note: "Six-axis backgauge press brake", image: { src: "/images/equipment-brake.jpg", alt: "Press brake forming a sheet metal part" } },
    { name: "Fanuc ARC Mate 120", category: "Welding", spec: "6-axis robotic cell", note: "MIG / TIG, weld data logging", image: { src: "/images/equipment-robot.jpg", alt: "Robotic welding cell in operation" } },
  ],

  certifications: [
    { code: "AS9100D", name: "Aerospace Quality Management", description: "Certified since 2011; current certificate available on request.", icon: "badge" },
    { code: "ISO 9001:2015", name: "Quality Management Systems", description: "Maintained alongside AS9100D under one registrar.", icon: "shield-check" },
    { code: "ITAR", name: "Registered with DDTC", description: "Registered exporter; controlled data handled under written procedures.", icon: "lock" },
    { code: "DFARS", name: "252.225-7009 Compliant", description: "Specialty metals sourced to domestic requirements.", icon: "scale" },
    { code: "NIST SP 800-171", name: "Controlled Unclassified Info", description: "Implemented with a documented System Security Plan.", icon: "fingerprint" },
    { code: "CMMC L2", name: "Assessment Ready", description: "Gap assessment complete; ready for third-party assessment.", icon: "shield-alert" },
    { code: "NADCAP", name: "Special Processes", description: "Finishing and NDT performed through NADCAP-accredited sources.", icon: "award" },
    { code: "SAM.gov", name: "Active Registration", description: "CAGE 8J4K2, active and eligible for federal award.", icon: "file-check" },
  ],

  case_studies: [
    {
      industry: "Commercial Aerospace",
      title: "Cutting cycle time 38% on a titanium hinge fitting",
      challenge: "A tier-one supplier was missing rate on a Ti-6Al-4V fitting with a 42-minute cycle and frequent tool failure.",
      solution: "Re-fixtured for single-setup 5-axis machining and rewrote the toolpath with trochoidal roughing.",
      process: "5-Axis Machining · CMM Inspection · Chem Film",
      result: "Cycle time reduced to 26 minutes with tool life tripled; scrap fell from 4.1% to 0.3%.",
      image: { src: "/images/case-titanium.jpg", alt: "Machined titanium aerospace fitting" },
    },
    {
      industry: "Defense",
      title: "Qualifying a domestic source for a legacy assembly",
      challenge: "An obsolete assembly had no usable model and a single offshore source with a 26-week lead time.",
      solution: "Scanned the legacy part, rebuilt the model, and produced first articles to AS9102 with full traceability.",
      process: "Reverse Engineering · Fabrication · Assembly",
      result: "Approved as a domestic second source; lead time reduced to 9 weeks under DFARS-compliant sourcing.",
      image: { src: "/images/case-assembly.jpg", alt: "Mechanical sub-assembly on an inspection bench" },
    },
    {
      industry: "Space",
      title: "Holding flatness on a thin-wall aluminium housing",
      challenge: "A 0.060 in wall housing distorted past a 0.0015 in flatness requirement after finishing.",
      solution: "Introduced a stress-relief step and a two-stage finishing sequence with in-process CMM verification.",
      process: "CNC Machining · Stress Relief · CMM",
      result: "Flatness held at 0.0008 in across a 400-piece run with zero rejections.",
      image: { src: "/images/case-housing.jpg", alt: "Thin-wall machined aluminium housing" },
    },
  ],

  resources: [
    { type: "Capability", title: "Arcline Capability Statement", description: "One-page overview of certifications, equipment, and NAICS codes for procurement files.", meta: "PDF · 1 page" },
    { type: "Guide", title: "Design for Manufacturability: Aerospace Machining", description: "Feature-level guidance on radii, wall thickness, and tolerance placement that reduce cost.", meta: "PDF · 18 pages" },
    { type: "Guide", title: "Tolerance Stack-Up Explained", description: "Worked examples of worst-case and statistical stack-up analysis on machined assemblies.", meta: "PDF · 12 pages" },
    { type: "Guide", title: "Aluminium vs Titanium: Selection Criteria", description: "Strength-to-weight, machinability, and cost trade-offs with service temperature limits.", meta: "PDF · 9 pages" },
    { type: "Reference", title: "First Article Inspection (AS9102) Walkthrough", description: "How to read an FAI package and what each form is actually attesting to.", meta: "PDF · 14 pages" },
    { type: "Reference", title: "Supplier Qualification Checklist", description: "What primes ask for during onboarding, and the documents to have ready.", meta: "PDF · 6 pages" },
  ],

  positions: [
    { title: "CNC Machinist — 2nd Shift", department: "Machining", location: "Wichita, KS", type: "Full-time", description: "Set up and run 3- and 4-axis mills to print with first-piece inspection responsibility." },
    { title: "Manufacturing Engineer", department: "Engineering", location: "Wichita, KS", type: "Full-time", description: "Own DFM review, fixturing strategy, and CAM programming for new part introductions." },
    { title: "Quality Inspector — CMM", department: "Quality", location: "Wichita, KS", type: "Full-time", description: "Program and operate CMM inspection; produce AS9102 first article documentation." },
    { title: "Machinist Apprentice", department: "Machining", location: "Wichita, KS", type: "Apprenticeship", description: "Paid two-year apprenticeship with tuition support and structured shop-floor training." },
  ],
};

export const DEFAULT_FAQS = [
  {
    question: "What industries do you serve?",
    answer:
      "Commercial aerospace, defense, space, medical, energy, industrial, semiconductor, and government programs. Roughly 70% of our volume is aerospace and defense, which is why our quality system and export-control procedures are built around those requirements rather than bolted on.",
  },
  {
    question: "What tolerances can you hold?",
    answer:
      "Routinely ±0.0005 in on machined features, and ±0.0002 in on 5-axis work where geometry and fixturing allow. Achievable tolerance depends on material, wall thickness, and feature access, so we confirm capability against your specific drawing during engineering review rather than quoting a blanket figure.",
  },
  {
    question: "Can you support prototype projects?",
    answer:
      "Yes, and we machine prototypes on production-intent processes so the first article predicts the production part. Typical prototype lead time is five to ten working days depending on material availability.",
  },
  {
    question: "Can you handle production runs?",
    answer:
      "Yes — from 50 pieces to 50,000 pieces annually. Repeat work runs on locked setups with documented travellers, and we support release schedules, managed stock, and consigned inventory.",
  },
  {
    question: "Do you work with government contractors?",
    answer:
      "Yes. We hold an active SAM.gov registration (CAGE 8J4K2), work as both a prime and a subcontractor, and meet DFARS specialty metals requirements. We are also implemented against NIST SP 800-171 and ready for CMMC Level 2 assessment.",
  },
  {
    question: "Are you ITAR registered?",
    answer:
      "Yes, we are registered with the Directorate of Defense Trade Controls. Controlled technical data is handled under written procedures with segregated storage and access limited to authorised US persons.",
  },
  {
    question: "What certifications do you have?",
    answer:
      "AS9100D and ISO 9001:2015 (single registrar), ITAR registration, DFARS compliance, and NIST SP 800-171 implementation. Special processes such as anodising, plating, and NDT are performed through NADCAP-accredited sources. Current certificates are included in every supplier qualification package.",
  },
  {
    question: "Can you manufacture from customer drawings?",
    answer:
      "That is the majority of our work. We build to print from native CAD or neutral formats (STEP, IGES) plus a dimensioned drawing. If you only have a legacy sample, our engineering group can scan it and rebuild the model.",
  },
  {
    question: "How quickly can I receive an RFQ?",
    answer:
      "Within one business day for a complete drawing package, including a manufacturing engineer's DFM notes. Complex assemblies or packages requiring outside process quotes may take two to three days, and we will tell you that on the first day rather than at the deadline.",
  },
  {
    question: "Can you sign an NDA?",
    answer:
      "Yes. We can execute your NDA or provide ours, typically within 24 hours. For ITAR or EAR controlled technical data we complete an export-control review before any transfer, so please request the NDA before uploading controlled drawings.",
  },
];
