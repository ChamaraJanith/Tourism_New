/**
 * Copies the platform lightningcss .node binary next to lightningcss/node
 * so PostCSS/Turbopack can load it on Windows when package resolution fails.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const platform =
  process.platform === "win32"
    ? `win32-${process.arch === "arm64" ? "arm64" : "x64"}-msvc`
    : null;

if (!platform) {
  process.exit(0);
}

const pkgDir = path.join(root, "node_modules", `lightningcss-${platform}`);
const src = path.join(pkgDir, `lightningcss.${platform}.node`);
const dest = path.join(root, "node_modules", "lightningcss", `lightningcss.${platform}.node`);

if (!fs.existsSync(src)) {
  console.warn(`[lightningcss] Native binary not found: ${src}`);
  process.exit(0);
}

fs.copyFileSync(src, dest);
console.log(`[lightningcss] Installed native binary at ${dest}`);
