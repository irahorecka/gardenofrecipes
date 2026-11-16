import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  SITE_URL,
  fillTemplate,
  homePage,
  homeSnapshot,
  recipePage,
  recipeSnapshot,
  sitemapXml,
} from "./render.js";

const template =
  '<head><title>Garden of Recipes</title></head><body><div id="root"></div></body>';
const recipe = {
  title: 'Mom\'s "Best" Pie',
  slug: "moms-pie",
  category: "Pies",
};
const volumes = {
  1: {
    label: "Volume I",
    index: { Pies: { recipes: [recipe] } },
  },
};

describe("fillTemplate", () => {
  it("swaps in the page's title, canonical and text", () => {
    const html = fillTemplate(
      template,
      recipePage(recipe, "Volume I"),
      recipeSnapshot("<h1>x</h1>"),
    );
    assert.equal(html.match(/<title>/g).length, 1);
    assert.match(
      html,
      /<link rel="canonical" href="https:\/\/gardenofrecipes\.org\/recipes\/moms-pie\/" \/>/,
    );
    assert.match(html, /<div id="root"><div hidden><h1>x<\/h1>/);
  });

  it("escapes the title", () => {
    const html = fillTemplate(template, recipePage(recipe, "Volume I"), "");
    assert.match(html, /Mom's &quot;Best&quot; Pie/);
  });
});

describe("homeSnapshot", () => {
  it("has one h1 and links to every recipe", () => {
    const html = homeSnapshot(volumes);
    assert.equal(html.match(/<h1>/g).length, 1);
    assert.match(html, /href="\/recipes\/moms-pie\/"/);
  });
});

describe("home page", () => {
  it("describes the site as structured data", () => {
    assert.equal(homePage().jsonLd["@type"], "WebSite");
  });
});

describe("sitemapXml", () => {
  it("lists each url once", () => {
    const xml = sitemapXml([SITE_URL, `${SITE_URL}recipes/a/`]);
    assert.equal(xml.match(/<loc>/g).length, 2);
  });
});
