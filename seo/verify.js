// Fails the build when a page would be unreadable to a crawler.
import { readFileSync } from "node:fs";
import process from "node:process";

const dist = new URL("../dist/", import.meta.url);
const read = (name) => readFileSync(new URL(name, dist), "utf8");
const count = (html, pattern) => (html.match(pattern) ?? []).length;

const SITE = "https://gardenofrecipes.org/";

/** Where a sitemap URL is served from: `/recipes/x/` is `recipes/x/index.html`. */
const fileFor = (url) => `${url.slice(SITE.length)}index.html`;

function problemsIn(url) {
  const html = read(fileFor(url));
  const checks = [
    ["exactly one <h1>", count(html, /<h1[ >]/g) === 1],
    ["a <title>", count(html, /<title>[^<]+<\/title>/g) === 1],
    ["a meta description", count(html, /<meta name="description"/g) === 1],
    [
      "its own canonical link",
      html.includes(`<link rel="canonical" href="${url}" />`),
    ],
  ];
  return checks
    .filter(([, ok]) => !ok)
    .map(([what]) => `${url}: needs ${what}`);
}

const urls = [...read("sitemap.xml").matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => m[1],
);
const problems = [
  ...(urls.length > 1 ? [] : ["sitemap.xml lists no recipes"]),
  ...(read("robots.txt").includes("Sitemap:")
    ? []
    : ["robots.txt does not name the sitemap"]),
  ...urls.flatMap(problemsIn),
];

if (problems.length) {
  console.error(`SEO check failed:\n${problems.join("\n")}`);
  process.exit(1);
}
console.log(`SEO check passed (${urls.length} pages).`);
