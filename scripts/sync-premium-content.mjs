import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync
} from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

const defaultSource = "C:\\Work\\Portfolio\\GamePackages\\public\\premium";
const defaultTarget = resolve("public", "premium");

const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const sourceRoot = resolve(readArg("--source") ?? process.env.PREMIUM_SOURCE ?? defaultSource);
const targetRoot = resolve(readArg("--target") ?? defaultTarget);
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const warnings = [];

assertInsideWorkspace(targetRoot);

if (!existsSync(sourceRoot)) {
  throw new Error(`Source folder does not exist: ${sourceRoot}`);
}

if (!statSync(sourceRoot).isDirectory()) {
  throw new Error(`Source path is not a folder: ${sourceRoot}`);
}

const copyPlan = buildCopyPlan();
const plannedTargetSet = new Set(copyPlan.map((item) => item.targetRelative));
const targetFiles = existsSync(targetRoot) ? listFiles(targetRoot) : [];

const missing = [];
const changed = [];
const extra = targetFiles.filter((file) => !plannedTargetSet.has(file));

for (const item of copyPlan) {
  if (!existsSync(item.target)) {
    missing.push(item.targetRelative);
    continue;
  }

  if (!sameFile(item.source, item.target)) {
    changed.push(item.targetRelative);
  }
}

if (checkOnly) {
  if (missing.length > 0 || changed.length > 0) {
    console.error("public/premium is not in sync with GamePackages.");
    printSummary();
    process.exit(1);
  }

  console.log("public/premium is already in sync with GamePackages.");
  printSummary();
  process.exit(0);
}

for (const item of copyPlan) {
  if (existsSync(item.target) && sameFile(item.source, item.target)) {
    continue;
  }

  mkdirSync(dirname(item.target), { recursive: true });
  copyFileSync(item.source, item.target);
}

console.log("public/premium sync complete.");
printSummary();

function buildCopyPlan() {
  const plan = [];
  const rulesFile = join(sourceRoot, "game_information.rules.json");

  if (existsSync(rulesFile)) {
    addPlan(plan, "game_information.rules.json", "game_information.rules.json");
  }

  const gameIds = readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => collator.compare(a, b));

  for (const id of gameIds) {
    addGameFile(plan, id, "spec/game_information_zh.md", "spec-zh.md");
    addGameFile(plan, id, "spec/game_information_en.md", "spec-en.md");
    addSimulationFile(plan, id);
  }

  return plan;
}

function addGameFile(plan, id, sourceRelative, targetFileName) {
  const source = join(sourceRoot, id, sourceRelative);

  if (!existsSync(source)) {
    warnings.push(`${id}: missing ${sourceRelative}`);
    return;
  }

  addPlan(plan, join(id, sourceRelative), join(id, targetFileName));
}

function addSimulationFile(plan, id) {
  const simulationRoot = join(sourceRoot, id, "simulation");

  if (!existsSync(simulationRoot)) {
    warnings.push(`${id}: missing simulation folder`);
    return;
  }

  const simulationFiles = readdirSync(simulationRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extname(entry.name).toLowerCase() === ".txt")
    .map((entry) => ({
      name: entry.name,
      modifiedAt: statSync(join(simulationRoot, entry.name)).mtimeMs
    }))
    .sort((a, b) => b.modifiedAt - a.modifiedAt || collator.compare(a.name, b.name));

  if (simulationFiles.length === 0) {
    warnings.push(`${id}: no simulation txt file found`);
    return;
  }

  if (simulationFiles.length > 1) {
    warnings.push(`${id}: found multiple simulation txt files, using ${simulationFiles[0].name}`);
  }

  addPlan(plan, join(id, "simulation", simulationFiles[0].name), join(id, "simulation.txt"));
}

function addPlan(plan, sourceRelative, targetRelative) {
  plan.push({
    source: join(sourceRoot, sourceRelative),
    target: join(targetRoot, targetRelative),
    targetRelative
  });
}

function readArg(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
}

function listFiles(root) {
  const files = [];
  walk(root, "");
  return files.sort((a, b) => collator.compare(a, b));

  function walk(currentRoot, currentRelative) {
    for (const entry of readdirSync(currentRoot, { withFileTypes: true })) {
      const relativePath = currentRelative
        ? join(currentRelative, entry.name)
        : entry.name;
      const fullPath = join(currentRoot, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath, relativePath);
      } else if (entry.isFile()) {
        files.push(relativePath);
      }
    }
  }
}

function sameFile(left, right) {
  const leftStat = statSync(left);
  const rightStat = statSync(right);

  if (leftStat.size !== rightStat.size) {
    return false;
  }

  return readFileSync(left).equals(readFileSync(right));
}

function assertInsideWorkspace(path) {
  const workspace = resolve(".");
  const normalized = resolve(path);
  const rel = relative(workspace, normalized);

  if (rel.startsWith("..") || resolve(rel) !== normalized) {
    throw new Error(`Refusing to write outside workspace: ${path}`);
  }
}

function printSummary() {
  console.log(`Source: ${sourceRoot}`);
  console.log(`Target: ${targetRoot}`);
  console.log(`Planned files: ${copyPlan.length}`);
  console.log(`Missing files: ${missing.length}`);
  console.log(`Changed files: ${changed.length}`);
  console.log(`Extra target files: ${extra.length} (kept)`);

  printExamples("Missing", missing);
  printExamples("Changed", changed);
  printExamples("Extra", extra);
  printWarnings();
}

function printExamples(label, files) {
  if (files.length === 0) {
    return;
  }

  console.log(`${label} examples: ${files.slice(0, 8).join(", ")}`);
}

function printWarnings() {
  if (warnings.length === 0) {
    return;
  }

  console.warn(`Warnings (${warnings.length}):`);
  for (const warning of warnings.slice(0, 20)) {
    console.warn(`- ${warning}`);
  }

  if (warnings.length > 20) {
    console.warn(`- ...and ${warnings.length - 20} more`);
  }
}
