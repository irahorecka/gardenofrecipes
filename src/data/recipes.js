import recipeIndexVol1 from "./recipeIndexVol1.json";
import recipeIndexVol2 from "./recipeIndexVol2.json";

export const recipeSources = {
  1: {
    label: "Volume I",
    pdfBase: "/recipes/pdf_vol1/",
    mdBase: "/recipes/md_vol1/",
    completePdf: "/recipes/pdf_vol1/GardenOfRecipesVol1Complete.pdf",
  },
  2: {
    label: "Volume II",
    pdfBase: "/recipes/pdf/",
    mdBase: "/recipes/md/",
    completePdf: "/recipes/pdf/GardenOfRecipesComplete.pdf",
  },
};

export const recipesByVolume = {
  1: recipeIndexVol1,
  2: recipeIndexVol2,
};

function flatten(volume, index) {
  const rows = [];
  Object.entries(index).forEach(([category, { recipes }]) => {
    recipes.forEach((r) => rows.push({ ...r, volume, category }));
  });
  return rows;
}

export const flatRecipes = [
  ...flatten(1, recipeIndexVol1),
  ...flatten(2, recipeIndexVol2),
];

export function getPdfUrl(recipe) {
  return `${recipeSources[recipe.volume].pdfBase}${recipe.pdf}`;
}

export function getMarkdownUrl(recipe) {
  const { mdBase } = recipeSources[recipe.volume];
  return mdBase ? `${mdBase}${recipe.slug}.md` : null;
}
