#!/usr/bin/env node
/**
 * Interactive library setup script.
 *
 * Run with:  npm run setup
 *
 * Walks through every configurable field one by one, shows a preview of all
 * planned changes, asks for confirmation, then writes package.json and
 * updates README.md in one go.
 */

import { createRequire } from "module";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ─── Lazy-load ESM-only deps (chalk, ora) and CJS dep (prompts) ─────────────
const { default: chalk } = await import("chalk");
const { default: ora } = await import("ora");
const prompts = require("prompts");

// ─── Helpers ─────────────────────────────────────────────────────────────────

const NPM_NAME_RE = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GITHUB_USER_RE = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

function readJson(relPath) {
  return JSON.parse(readFileSync(resolve(ROOT, relPath), "utf8"));
}

function writeJson(relPath, data) {
  writeFileSync(resolve(ROOT, relPath), JSON.stringify(data, null, 2) + "\n", "utf8");
}

function readText(relPath) {
  return readFileSync(resolve(ROOT, relPath), "utf8");
}

function writeText(relPath, content) {
  writeFileSync(resolve(ROOT, relPath), content, "utf8");
}

function label(text) {
  return chalk.bold.cyan(text);
}

function dim(text) {
  return chalk.dim(text);
}

function success(text) {
  return chalk.green("✔ ") + text;
}

function preview(key, value) {
  return `  ${chalk.bold(key.padEnd(18))} ${chalk.yellow(value)}`;
}

function bail() {
  console.log("\n" + chalk.yellow("Setup cancelled. Nothing was changed."));
  process.exit(0);
}

// ─── Banner ──────────────────────────────────────────────────────────────────

console.log(
  "\n" +
  chalk.bold.blue("╔══════════════════════════════════════════════════════╗") +
  "\n" +
  chalk.bold.blue("║") + chalk.bold.white("   React Native TypeScript Library — Setup Wizard   ") + chalk.bold.blue("║") +
  "\n" +
  chalk.bold.blue("╚══════════════════════════════════════════════════════╝") +
  "\n" +
  dim("  Answers are validated as you type. Press Ctrl+C to quit.\n"),
);

// ─── Prompts ─────────────────────────────────────────────────────────────────

const answers = await prompts(
  [
    {
      type: "text",
      name: "name",
      message: label("Package name") + dim(" (npm)"),
      initial: "",
      hint: "e.g. react-native-my-library or @my-org/my-library",
      validate: (v) =>
        NPM_NAME_RE.test(v.trim())
          ? true
          : "Must be a valid npm package name (lowercase, no spaces)",
      format: (v) => v.trim().toLowerCase(),
    },
    {
      type: "text",
      name: "description",
      message: label("Description") + dim(" (one sentence)"),
      initial: "",
      hint: "e.g. A lightweight React Native button library",
      validate: (v) =>
        v.trim().length >= 10
          ? true
          : "Please enter at least 10 characters",
      format: (v) => v.trim(),
    },
    {
      type: "text",
      name: "githubUser",
      message: label("GitHub username") + dim(" (or org)"),
      initial: "",
      hint: "e.g. WrathChaos",
      validate: (v) =>
        GITHUB_USER_RE.test(v.trim())
          ? true
          : "Must be a valid GitHub username",
      format: (v) => v.trim(),
    },
    {
      type: "text",
      name: "githubRepo",
      message: label("GitHub repository name"),
      initial: (prev, values) => values.name ?? "",
      hint: "Leave blank to use the package name",
      format: (v) => v.trim() || undefined,
    },
    {
      type: "text",
      name: "authorName",
      message: label("Author name"),
      initial: "",
      validate: (v) => (v.trim().length > 0 ? true : "Required"),
      format: (v) => v.trim(),
    },
    {
      type: "text",
      name: "authorEmail",
      message: label("Author email"),
      initial: "",
      validate: (v) =>
        EMAIL_RE.test(v.trim()) ? true : "Must be a valid email address",
      format: (v) => v.trim(),
    },
    {
      type: "select",
      name: "license",
      message: label("License"),
      choices: [
        { title: "MIT", value: "MIT" },
        { title: "Apache-2.0", value: "Apache-2.0" },
        { title: "ISC", value: "ISC" },
        { title: "GPL-3.0", value: "GPL-3.0" },
        { title: "Unlicensed (proprietary)", value: "UNLICENSED" },
      ],
      initial: 0,
    },
    {
      type: "list",
      name: "keywords",
      message: label("Keywords") + dim(" (comma-separated, optional)"),
      initial: "",
      hint: "e.g. button, animation, gesture — added to base keywords",
      separator: ",",
      format: (v) => v.map((k) => k.trim()).filter(Boolean),
    },
  ],
  {
    onCancel: bail,
  },
);

// ─── Derive computed values ───────────────────────────────────────────────────

const repoName = answers.githubRepo || answers.name;
const repoUrl = `https://github.com/${answers.githubUser}/${repoName}`;
const gitUrl = `${repoUrl}.git`;
const homepageUrl = `${repoUrl}#readme`;
const bugsUrl = `${repoUrl}/issues`;
const author = `${answers.authorName} <${answers.authorEmail}>`;

// ─── Preview ─────────────────────────────────────────────────────────────────

console.log(
  "\n" + chalk.bold.white("  Preview of changes") + "\n" +
  chalk.dim("  ─────────────────────────────────────────────────────\n") +
  preview("name", answers.name) + "\n" +
  preview("description", answers.description) + "\n" +
  preview("author", author) + "\n" +
  preview("license", answers.license) + "\n" +
  preview("repository", gitUrl) + "\n" +
  preview("homepage", homepageUrl) + "\n" +
  preview("bugs", bugsUrl) + "\n" +
  (answers.keywords.length > 0
    ? preview("keywords (+)", answers.keywords.join(", ")) + "\n"
    : "") +
  chalk.dim("  ─────────────────────────────────────────────────────\n"),
);

const { confirmed } = await prompts(
  {
    type: "confirm",
    name: "confirmed",
    message: "Apply these changes?",
    initial: true,
  },
  { onCancel: bail },
);

if (!confirmed) bail();

// ─── Apply changes ────────────────────────────────────────────────────────────

const spinner = ora("Updating package.json…").start();

try {
  // --- package.json ---
  const pkg = readJson("package.json");

  const BASE_KEYWORDS = [
    "react-native",
    "typescript",
    "library",
    "starter",
    "template",
    "component",
    "hook",
    "ai-ready",
    "bob",
    "react-native-builder-bob",
  ];

  pkg.name = answers.name;
  pkg.version = "0.1.0";
  pkg.description = answers.description;
  pkg.author = author;
  pkg.license = answers.license;
  pkg.repository = { type: "git", url: gitUrl };
  pkg.homepage = homepageUrl;
  pkg.bugs = { url: bugsUrl };
  pkg.keywords = [
    ...BASE_KEYWORDS,
    ...answers.keywords.filter((k) => !BASE_KEYWORDS.includes(k)),
  ];

  writeJson("package.json", pkg);
  spinner.succeed("package.json updated");

  // --- README.md ---
  spinner.start("Updating README.md…");

  const STARTER_NAME = "react-native-typescript-library-starter";
  const STARTER_GITHUB = "WrathChaos/react-native-typescript-library-starter";

  let readme = readText("README.md");

  readme = readme
    .replaceAll(STARTER_NAME, answers.name)
    .replaceAll(STARTER_GITHUB, `${answers.githubUser}/${repoName}`)
    .replaceAll("FreakyCoder", answers.authorName)
    .replaceAll("kurayogun@gmail.com", answers.authorEmail)
    .replaceAll("https://www.freakycoder.com", homepageUrl);

  writeText("README.md", readme);
  spinner.succeed("README.md updated");

  // --- AGENTS.md ---
  spinner.start("Updating AGENTS.md…");

  let agents = readText("AGENTS.md");
  agents = agents
    .replaceAll(STARTER_NAME, answers.name)
    .replaceAll(STARTER_GITHUB, `${answers.githubUser}/${repoName}`);

  writeText("AGENTS.md", agents);
  spinner.succeed("AGENTS.md updated");

  // --- CONTRIBUTING.md ---
  spinner.start("Updating CONTRIBUTING.md…");

  let contributing = readText("CONTRIBUTING.md");
  contributing = contributing
    .replaceAll(STARTER_GITHUB, `${answers.githubUser}/${repoName}`);

  writeText("CONTRIBUTING.md", contributing);
  spinner.succeed("CONTRIBUTING.md updated");

} catch (err) {
  spinner.fail("Something went wrong: " + err.message);
  process.exit(1);
}

// ─── Next steps ───────────────────────────────────────────────────────────────

console.log(
  "\n" +
  chalk.bold.green("  All done! Your library is configured.\n") +
  "\n" +
  chalk.bold("  Next steps:\n") +
  "\n" +
  `  ${dim("1.")} ${chalk.white("npm run husky:setup")}    ${dim("— set up git hooks")}\n` +
  `  ${dim("2.")} ${chalk.white("npm run build")}           ${dim("— verify the build pipeline")}\n` +
  `  ${dim("3.")} ${chalk.white("npm test")}                ${dim("— run the test suite")}\n` +
  `  ${dim("4.")} Replace ${chalk.cyan("src/components/MyComponent")} and ${chalk.cyan("src/hooks/useMyHook.ts")}\n` +
  `     with your own implementation.\n` +
  `  ${dim("5.")} Update ${chalk.cyan("README.md")} with your component's API docs.\n` +
  "\n" +
  `  ${chalk.bold("Secrets needed for CI releases:")}\n` +
  `  ${dim("•")} ${chalk.yellow("NPM_TOKEN")} — in your GitHub repo → Settings → Secrets\n` +
  "\n",
);
