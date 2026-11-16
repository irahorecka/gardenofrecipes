import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";

import {
  flatRecipes,
  getMarkdownUrl,
  recipeSources,
  recipesByVolume,
} from "../src/data/recipes.js";
import {
  SITE_URL,
  fillTemplate,
  homePage,
  homeSnapshot,
  recipePage,
  recipeSnapshot,
  recipeUrl,
  robotsTxt,
  sitemapXml,
} from "./render.js";

const markdownToHtml = (markdown) =>
  renderToStaticMarkup(createElement(ReactMarkdown, null, markdown));

/** A recipe's markdown lives under public/, at the path the app fetches it from. */
const readRecipeMarkdown = (recipe) =>
  readFileSync(
    new URL(`../public${getMarkdownUrl(recipe)}`, import.meta.url),
    "utf8",
  );

const volumes = Object.fromEntries(
  Object.entries(recipeSources).map(([volume, { label }]) => [
    volume,
    { label, index: recipesByVolume[volume] },
  ]),
);

/**
 * Gives the home page and every recipe a real HTML page with its own title,
 * description and text, so crawlers need no JavaScript. React replaces the text on load.
 */
export function seo() {
  return {
    name: "seo",
    enforce: "post",
    generateBundle(_, bundle) {
      const template = bundle["index.html"].source;

      bundle["index.html"].source = fillTemplate(
        template,
        homePage(),
        homeSnapshot(volumes),
      );

      for (const recipe of flatRecipes) {
        const page = recipePage(recipe, recipeSources[recipe.volume].label);
        const snapshot = recipeSnapshot(
          markdownToHtml(readRecipeMarkdown(recipe)),
        );
        this.emitFile({
          type: "asset",
          fileName: `recipes/${recipe.slug}/index.html`,
          source: fillTemplate(template, page, snapshot),
        });
      }

      const urls = [SITE_URL, ...flatRecipes.map(recipeUrl)];
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: sitemapXml(urls),
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: robotsTxt(),
      });
    },
  };
}
