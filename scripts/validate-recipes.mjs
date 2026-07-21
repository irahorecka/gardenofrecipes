#!/usr/bin/env node
// Node's ESM loader requires an explicit `type: "json"` import attribute for
// JSON imports, which src/data/recipes.js doesn't use (Vite handles bare
// JSON imports; plain Node doesn't). So this script reads the index files
// directly from disk and mirrors recipeSources' path config below instead of
// importing the adapter.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

const sources = [
  {
    volume: 1,
    label: "Volume I",
    indexPath: "src/data/recipeIndexVol1.json",
    pdfDir: "public/recipes/pdf_vol1",
    mdDir: null,
  },
  {
    volume: 2,
    label: "Volume II",
    indexPath: "src/data/recipeIndexVol2.json",
    pdfDir: "public/recipes/pdf",
    mdDir: "public/recipes/md",
  },
];

const errors = [];
const slugOwners = new Map();
let totalRecipes = 0;
let totalCategories = 0;
let pdfChecks = 0;
let mdChecks = 0;

for (const source of sources) {
  const fullIndexPath = join(rootDir, source.indexPath);
  let raw;
  try {
    raw = readFileSync(fullIndexPath, "utf8");
  } catch (err) {
    errors.push(
      `[${source.label}] could not read ${source.indexPath}: ${err.message}`,
    );
    continue;
  }

  let index;
  try {
    index = JSON.parse(raw);
  } catch (err) {
    errors.push(
      `[${source.label}] ${source.indexPath} is not valid JSON: ${err.message}`,
    );
    continue;
  }

  for (const [category, categoryData] of Object.entries(index)) {
    totalCategories++;
    if (!categoryData || !Array.isArray(categoryData.recipes)) {
      errors.push(
        `[${source.label}] category "${category}" is missing a "recipes" array`,
      );
      continue;
    }

    categoryData.recipes.forEach((recipe, i) => {
      const where = `[${source.label}] "${category}" recipe #${i + 1}${
        recipe?.title ? ` ("${recipe.title}")` : ""
      }`;

      for (const field of ["title", "slug", "pdf"]) {
        if (
          typeof recipe?.[field] !== "string" ||
          recipe[field].trim() === ""
        ) {
          errors.push(`${where}: missing or empty "${field}"`);
        }
      }
      if (!Number.isFinite(recipe?.page) || recipe.page <= 0) {
        errors.push(`${where}: "page" must be a positive number`);
      }

      if (typeof recipe?.slug === "string" && recipe.slug.trim() !== "") {
        const existing = slugOwners.get(recipe.slug);
        if (existing) {
          errors.push(
            `Duplicate slug "${recipe.slug}": used by ${existing} and ${source.label} "${recipe.title ?? "(untitled)"}"`,
          );
        } else {
          slugOwners.set(
            recipe.slug,
            `${source.label} "${recipe.title ?? "(untitled)"}"`,
          );
        }
      }

      if (typeof recipe?.pdf === "string" && recipe.pdf.trim() !== "") {
        pdfChecks++;
        const pdfPath = join(rootDir, source.pdfDir, recipe.pdf);
        if (!existsSync(pdfPath)) {
          errors.push(
            `${where}: missing PDF at ${source.pdfDir}/${recipe.pdf}`,
          );
        }
      }

      if (
        source.mdDir &&
        typeof recipe?.slug === "string" &&
        recipe.slug.trim() !== ""
      ) {
        mdChecks++;
        const mdPath = join(rootDir, source.mdDir, `${recipe.slug}.md`);
        if (!existsSync(mdPath)) {
          errors.push(
            `${where}: missing markdown at ${source.mdDir}/${recipe.slug}.md`,
          );
        }
      }

      totalRecipes++;
    });
  }
}

if (errors.length > 0) {
  console.error(`✖ recipe validation failed with ${errors.length} error(s):\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exitCode = 1;
} else {
  console.log("✓ recipe validation passed");
  console.log(
    `  ${totalRecipes} recipes across ${totalCategories} categories (${slugOwners.size} unique slugs), ${pdfChecks} PDFs and ${mdChecks} markdown files verified.`,
  );
}
