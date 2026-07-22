# Garden of Recipes

Static website hosting the Schoellman family's _Garden of Recipes_ archive — Volume I and Volume II — collected by Agnes Schoellman.

Built using [Vite](https://vitejs.dev/) with [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/). Deployed to GitHub Pages at [gardenofrecipes.org](https://gardenofrecipes.org).

## Structure

This is a single-page application (SPA) using React Router v7. Routes like `/recipes/basic-pancakes` are resolved client-side. A fallback `404.html` (copied from `index.html`) ensures routing works on reload when served via GitHub Pages.

## Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS with Typography plugin
- **Markdown Rendering**: `react-markdown`
- **Routing**: `react-router-dom@7`
- **Deployment**: GitHub Pages (`gh-pages`)
- **Linting**: ESLint with React hooks and refresh plugins

## Scripts

```bash
npm run dev        # Start local dev server
npm run build      # Build + copy index.html to 404.html
npm run preview    # Preview local build
npm run validate   # Validate recipe data (slugs, PDFs, markdown)
npm run deploy     # Deploy to GitHub Pages
npm run clean      # Remove build output
```

## Notes

- Markdown recipes are stored under `public/`.
- Recipe metadata is split by volume in `src/data/recipeIndexVol1.json` and `src/data/recipeIndexVol2.json`, and normalized through the shared adapter in `src/data/recipes.js`.
- The main entry point is `src/main.jsx`. Routes are defined in `src/App.jsx`.
