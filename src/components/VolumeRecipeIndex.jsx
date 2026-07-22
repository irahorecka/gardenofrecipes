import { Link } from "react-router-dom";
import { recipesByVolume, recipeSources, getPdfUrl } from "../data/recipes.js";

export default function VolumeRecipeIndex({ volume }) {
  const categories = Object.entries(recipesByVolume[volume]).map(
    ([category, { recipes }]) => ({
      category,
      recipes,
    }),
  );
  const showCategoryHeading = categories.length > 1;

  return (
    <div>
      <h2 className="mb-4 font-semibold font-cursive text-[160%]">
        {recipeSources[volume].label}
      </h2>
      {categories.map(({ category, recipes }) => (
        <div key={category} className="mb-8 px-4">
          {showCategoryHeading && (
            <h3 className="mb-4 font-semibold font-cursive text-[150%]">
              {category}
            </h3>
          )}
          <ul className="list-none mb-2 mx-auto text-left max-w-prose text-[95%]">
            {recipes.map(({ title, slug, page, pdf }) => (
              <li
                key={slug}
                className="my-2 grid grid-cols-[auto_1fr_auto] items-center gap-x-2 md:gap-x-6"
              >
                <Link to={`/recipes/${slug}`} className="underline break-words">
                  {title}
                </Link>
                <span
                  className="mx-2 whitespace-nowrap overflow-hidden text-center text-[70%] flex-grow"
                  style={{ letterSpacing: "0.3em" }}
                >
                  {".".repeat(60)}
                </span>
                <a
                  href={getPdfUrl({ volume, pdf })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
