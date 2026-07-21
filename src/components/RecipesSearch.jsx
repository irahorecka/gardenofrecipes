import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Link, useNavigate } from "react-router-dom";
import { flatRecipes } from "../data/recipes.js";

export default function RecipeSearch({ autoFocus = false }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(-1); // keyboard highlight index
  const navigate = useNavigate();

  const fuse = useMemo(
    () =>
      new Fuse(flatRecipes, {
        includeScore: false,
        threshold: 0.35, // fuzzy but not too fuzzy
        keys: ["title", "category", "slug"],
      }),
    [],
  );

  const results = q.trim()
    ? fuse
        .search(q)
        .slice(0, 10)
        .map((r) => r.item)
    : [];

  const maxIndex = results.length - 1;

  return (
    <div className="relative mx-auto mb-6 max-w-prose">
      <div className="relative flex items-center">
        <input
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(-1);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setQ("");
              setActive(-1);
              e.currentTarget.blur();
              return;
            }
            if (!results.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => (i < maxIndex ? i + 1 : 0));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => (i > 0 ? i - 1 : maxIndex));
            } else if (e.key === "Home") {
              e.preventDefault();
              setActive(0);
            } else if (e.key === "End") {
              e.preventDefault();
              setActive(maxIndex);
            } else if (e.key === "Enter" && active >= 0) {
              e.preventDefault();
              navigate(`/recipes/${results[active].slug}`);
            }
          }}
          placeholder="Search recipes…"
          className="w-full rounded border border-black/20 bg-white/90 px-3 py-2 text-gray-800 placeholder-gray-400 outline-none focus:border-black/40"
          type="text"
          inputMode="search"
          aria-label="Search recipes"
        />
        {q && (
          <button
            type="button"
            className="absolute right-1.5 inline-flex h-7 w-7 items-center justify-center rounded text-black/70 hover:text-black"
            aria-label="Clear search"
            onClick={() => {
              setQ("");
              setActive(-1);
            }}
          >
            ×
          </button>
        )}
      </div>

      {q && (
        <div
          className="absolute z-50 mt-2 w-full overflow-hidden rounded border border-black/20 bg-white/95 shadow"
          role="listbox"
        >
          {results.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-600">No matches</div>
          ) : (
            <ul>
              {results.map((r, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={r.slug}
                    className={`border-t first:border-t-0 ${isActive ? "bg-gray-100" : ""}`}
                  >
                    <Link
                      to={`/recipes/${r.slug}`}
                      className="grid grid-cols-[1fr_auto] items-start gap-x-3 px-3 py-2 no-underline hover:bg-gray-50"
                      onMouseEnter={() => setActive(i)}
                      onMouseDown={(e) => {
                        // allow list selection with mouse without losing focus
                        e.preventDefault();
                        navigate(`/recipes/${r.slug}`);
                      }}
                    >
                      <span className="recipe-title pr-3">{r.title}</span>
                      <span className="recipe-meta whitespace-pre-wrap">
                        {r.category}
                        {r.page ? ` · p.${r.page}` : ""}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
