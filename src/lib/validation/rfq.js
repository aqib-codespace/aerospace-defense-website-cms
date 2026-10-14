import { z } from "zod";

/**
 * RFQ submission. Kept lenient on the commercial fields and strict on the ones
 * a quote cannot proceed without — a lost RFQ costs more than an untidy record.
 */
export const rfqSchema = z.object({
  company: z.string().trim().min(2, "Company name is required.").max(120),
  name: z.string().trim().min(2, "Please enter a contact name.").max(80),
  phone: z.string().trim().min(7, "Please enter a phone number.").max(40),
  email: z.string().trim().pipe(z.email("Please enter a valid email address.")),
  industry: z.string().trim().max(80),
  serviceNeeded: z.string().trim().min(1, "Please choose the service required.").max(120),
  description: z.string().trim().min(10, "Please describe the part or project.").max(4000),
  material: z.string().trim().max(120),
  quantity: z.string().trim().max(60),
  tolerance: z.string().trim().max(60),
  timeline: z.string().trim().max(80),
  ndaRequired: z.boolean(),
  notes: z.string().trim().max(2000),
});

/**
 * Drawing packages are validated by EXTENSION rather than MIME type.
 *
 * Browsers report CAD formats inconsistently — STEP files commonly arrive as
 * application/octet-stream or an empty string — so a MIME allow-list would
 * reject legitimate engineering data. The file is never executed or served
 * publicly, so extension checking plus a size cap is the appropriate control.
 */
export const ALLOWED_DRAWING_EXTENSIONS = [
  "pdf",
  "step",
  "stp",
  "iges",
  "igs",
  "dxf",
  "dwg",
  "sldprt",
  "sldasm",
  "ipt",
  "iam",
  "x_t",
  "x_b",
  "3dm",
  "stl",
  "zip",
  "7z",
  "png",
  "jpg",
  "jpeg",
];

export const MAX_DRAWING_BYTES = 25 * 1024 * 1024;

export function drawingExtension(filename) {
  const match = String(filename ?? "")
    .toLowerCase()
    .match(/\.([a-z0-9_]+)$/);
  return match ? match[1] : "";
}
