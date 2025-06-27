# Garden of Recipes: Volume II

Static website to host _Garden of Recipes: Volume II (Christmas 1988)_ by Agnes Schoellman.

Built using [Vite](https://vitejs.dev/) with [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/). Deployed to GitHub Pages at [gardenofrecipes.org](https://gardenofrecipes.org).

## Structure

This is a single-page application (SPA) using React Router v7. Routes like `/recipes/basic-pancakes` are resolved client-side. A fallback `404.html` (copied from `index.html`) ensures routing works on reload when served via GitHub Pages.

## Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS with Typography plugin
- **Markdown Rendering**: `react-markdown` + `gray-matter`
- **Routing**: `react-router-dom@7`
- **Deployment**: GitHub Pages (`gh-pages`)
- **Linting**: ESLint with React hooks and refresh plugins

## Scripts

```bash
npm run dev        # Start local dev server
npm run build      # Build + copy index.html to 404.html
npm run preview    # Preview local build
npm run deploy     # Deploy to GitHub Pages
npm run clean      # Remove build output
```

## Notes

- Markdown recipes are stored under `public/`.
- Recipe metadata is parsed using `gray-matter`.
- The main entry point is `src/main.jsx`. Routes are defined in `src/App.jsx`.
