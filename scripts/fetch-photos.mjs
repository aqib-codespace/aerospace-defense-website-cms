/**
 * Downloads the template's placeholder photography, crops each shot to the
 * aspect ratio its slot expects, and writes it into public/images.
 *
 * The source licences these photos for commercial use with no attribution
 * required; public/images/CREDITS.md is written anyway so whoever ships a client
 * site can see exactly what needs replacing and where it came from.
 *
 * Run with: npm run photos
 */
import { mkdir, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = path.join(root, "public", "images");

/** Ask the CDN for a generous source width; sharp does the final crop. */
const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;

const PHOTOS = [
  {
    // Chosen for dark, high-contrast lighting: the hero's left-edge gradient
    // needs a shot that can take a scrim without turning to mud, and a bright
    // evenly-lit photo would wash out the headline.
    file: "hero-machining.jpg",
    width: 1800,
    height: 1600,
    url: pexels(8956445),
    credit: "Pexels — CNC machining with coolant",
  },
  {
    file: "facility-floor.jpg",
    width: 1600,
    height: 1200,
    url: pexels(3688760),
    credit: "Pexels — machine shop floor with CNC equipment",
  },
  {
    file: "careers-machinist.jpg",
    width: 1400,
    height: 900,
    url: pexels(9242171),
    credit: "Pexels — machinist operating a CNC machine",
  },
  {
    file: "financing-floor.jpg",
    width: 1400,
    height: 1050,
    url: pexels(2760241),
    credit: "Pexels — engineer inspecting plant machinery",
  },

  // Equipment gallery
  {
    file: "equipment-mill.jpg",
    width: 1000,
    height: 750,
    url: pexels(28929510),
    credit: "Pexels — industrial CNC lathe in a machine shop",
  },
  {
    file: "equipment-vmc.jpg",
    width: 1000,
    height: 750,
    url: pexels(10406128),
    credit: "Pexels — CNC milling machine cutting metal",
  },
  {
    file: "equipment-cmm.jpg",
    width: 1000,
    height: 750,
    url: pexels(32845692),
    credit: "Pexels — inspection with a tablet in a controlled area",
  },
  {
    file: "equipment-laser.jpg",
    width: 1000,
    height: 750,
    url: pexels(7254410),
    credit: "Pexels — laser cutting head in operation",
  },
  {
    file: "equipment-brake.jpg",
    width: 1000,
    height: 750,
    url: pexels(32845674),
    credit: "Pexels — sheet metal handling in a fabrication shop",
  },
  {
    file: "equipment-robot.jpg",
    width: 1000,
    height: 750,
    url: pexels(18471453),
    credit: "Pexels — automated industrial machinery",
  },

  // Case studies
  {
    file: "case-titanium.jpg",
    width: 1100,
    height: 825,
    url: pexels(8956313),
    credit: "Pexels — high-speed drilling with coolant",
  },
  {
    file: "case-assembly.jpg",
    width: 1100,
    height: 825,
    url: pexels(32845690),
    credit: "Pexels — engineers reviewing work on the floor",
  },
  {
    file: "case-housing.jpg",
    width: 1100,
    height: 825,
    url: pexels(20607184),
    credit: "Pexels — precision milling detail",
  },
];

await mkdir(imagesDir, { recursive: true });

const results = [];

for (const photo of PHOTOS) {
  try {
    const response = await fetch(photo.url, {
      headers: { "user-agent": "aerospace-template/1.0" },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const buffer = Buffer.from(await response.arrayBuffer());
    await sharp(buffer)
      .resize({
        width: photo.width,
        height: photo.height,
        fit: "cover",
        position: "attention", // libvips picks the busiest region
      })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(imagesDir, photo.file));

    results.push({ ...photo, ok: true });
    console.log(`ok  ${photo.file}`);
  } catch (error) {
    results.push({ ...photo, ok: false, error: error.message });
    console.warn(`x   ${photo.file} — ${error.message}`);
  }
}

/**
 * Next.js caches optimised images by (url, width, quality). Because this script
 * replaces files at the SAME filenames, those cache entries stay valid by key
 * while pointing at the old picture — the site then serves the previous image
 * indefinitely even though the file on disk changed. Clearing the cache here is
 * what stops "I replaced the photo but the old one still shows".
 */
await rm(path.join(root, ".next", "cache", "images"), { recursive: true, force: true });

const ok = results.filter((r) => r.ok);
const credits = [
  "# Placeholder photography",
  "",
  "Every image below is a **placeholder** downloaded from a free-licence stock",
  "source by `npm run photos`. Replace them with the plant's own photography",
  "before launch — either drop new files in at the same filenames, or upload them",
  "in the admin panel (Media Library) and repoint each section's image.",
  "",
  "Photographs of a controlled facility should be reviewed for export-control",
  "content before publication.",
  "",
  "| File | Source |",
  "| --- | --- |",
  ...ok.map((r) => `| \`${r.file}\` | ${r.credit} |`),
  "",
  `_Generated ${ok.length}/${PHOTOS.length} files._`,
  "",
].join("\n");

await writeFile(path.join(imagesDir, "CREDITS.md"), credits, "utf8");

console.log(`\n${ok.length}/${PHOTOS.length} photos written to public/images.`);
console.log("Cleared .next/cache/images so the new files are served immediately.");
