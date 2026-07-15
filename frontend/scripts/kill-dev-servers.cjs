/**
 * Stops stray Next.js dev servers for this project and removes the dev lock file.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const lockFile = path.join(projectRoot, ".next", "dev", "lock");

try {
  const out = execSync('wmic process where "name=\'node.exe\'" get ProcessId,CommandLine /format:list', {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });

  const blocks = out.split(/\r?\n\r?\n/).filter(Boolean);
  for (const block of blocks) {
    const cmd = (block.match(/CommandLine=(.*)/s) || [])[1] || "";
    const pid = (block.match(/ProcessId=(\d+)/) || [])[1];
    if (!pid) continue;
    if (cmd.includes("next dev") && cmd.includes(projectRoot.replace(/\\/g, "\\\\"))) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        console.log(`Stopped Next dev server (PID ${pid})`);
      } catch {
        /* already exited */
      }
    }
  }
} catch {
  /* wmic unavailable — ignore */
}

if (fs.existsSync(lockFile)) {
  fs.rmSync(lockFile, { force: true });
  console.log("Removed .next/dev/lock");
}
