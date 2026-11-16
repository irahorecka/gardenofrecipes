// Pure functions: site data in, crawlable HTML and text out. No Vite, no filesystem.
export const SITE_URL = "https://gardenofrecipes.org/";
const SITE_NAME = "Garden of Recipes";
const HOME_TITLE = `${SITE_NAME}: Schoellman family recipe archive`;
const HOME_DESCRIPTION =
  "A digital preservation of a family recipe book inspired by Texas Czech cuisine and lovingly compiled by Agnes Schoellman. Browse and search every recipe from Volumes I and II.";
const SHARE_IMAGE = `${SITE_URL}chef-icon.png`;

const TITLE_TAG = /<title>.*?<\/title>/;
const EMPTY_ROOT = '<div id="root"></div>';

const escapeHtml = (text) =>
  String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const recipeUrl = (recipe) => `${SITE_URL}recipes/${recipe.slug}/`;

export const homePage = () => ({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  canonical: SITE_URL,
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: HOME_DESCRIPTION,
    inLanguage: "en",
  },
});

export const recipePage = (recipe, volumeLabel) => ({
  title: `${recipe.title} | ${SITE_NAME}`,
  description: `${recipe.title}, from the ${recipe.category} section of ${volumeLabel} of ${SITE_NAME}, the Schoellman family recipe archive.`,
  canonical: recipeUrl(recipe),
});

/** The tags that replace the template's <title>: identity, canonical, social and structured data. */
function headTags({ title, description, canonical, jsonLd }) {
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${SHARE_IMAGE}" />`,
    `<meta name="twitter:card" content="summary" />`,
  ];
  if (jsonLd) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
    );
  }
  return tags.join("\n    ");
}

const recipeLink = (recipe) =>
  `<li><a href="/recipes/${recipe.slug}/">${escapeHtml(recipe.title)}</a></li>`;

function categorySection([category, { recipes }]) {
  return `<h3>${escapeHtml(category)}</h3><ul>${recipes.map(recipeLink).join("")}</ul>`;
}

function volumeSection([, { label, index }]) {
  const sections = Object.entries(index).map(categorySection).join("");
  return `<h2>${escapeHtml(label)}</h2>${sections}`;
}

/** Home page text for crawlers that do not run JavaScript: what the site is, and a link to every recipe. */
export function homeSnapshot(volumes) {
  return [
    "<div hidden>",
    `<h1>${SITE_NAME}</h1>`,
    `<p>${escapeHtml(HOME_DESCRIPTION)}</p>`,
    Object.entries(volumes).map(volumeSection).join(""),
    "</div>",
  ].join("");
}

/** Recipe page text for crawlers: the recipe itself, already rendered to HTML. */
export const recipeSnapshot = (recipeHtml) =>
  `<div hidden>${recipeHtml}<p><a href="/">Back to ${SITE_NAME}</a></p></div>`;

/** The built index.html with this page's head and body text in place of the generic ones. */
export function fillTemplate(template, page, snapshot) {
  return template
    .replace(TITLE_TAG, () => headTags(page))
    .replace(EMPTY_ROOT, () => `<div id="root">${snapshot}</div>`);
}

export const sitemapXml = (urls) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n")}\n</urlset>\n`;

export const robotsTxt = () =>
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`;

export { recipeUrl };
