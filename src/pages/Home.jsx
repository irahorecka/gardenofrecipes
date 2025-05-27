import { Link } from "react-router-dom";
import recipeIndex from "../data/recipeIndex.json";

const recipeCategories = Object.entries(recipeIndex).map(
  ([category, { recipes }]) => ({
    category,
    recipes,
  }),
);

export default function Home() {
  return (
    <div className="prose mx-auto py-2 text-center text-[110%] max-w-prose">
      <h1 className="mb-8 text-2xl text-[150%] font-semibold font-[cursive]">
        Schoellman Recipe Archive
      </h1>
      <p>
        This is a digital preservation of a family recipe book, inspired by
        Texas Czech cuisine and lovingly compiled by Agnes Schoellman and
        others. Once gifted in print to Joe Horecka, it now finds a quiet home
        on the web.
      </p>
      <p className="mt-4">
        A full scan of the original spiral-bound edition is available for
        download{" "}
        <a
          href="/Schoellman_Recipes.pdf"
          className="underline hover:text-gray-900"
        >
          here
        </a>
        .
      </p>
      <div
        className="my-6 text-gray-800 text-base text-center"
        style={{
          fontSize: "16px",
          letterSpacing: "0.3em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "clip",
        }}
      >
        {"*".repeat(60)}
      </div>
      {recipeCategories.map(({ category, recipes }) => (
        <div key={category} className="mb-8 px-4">
          <h3 className="text-lg mb-4 text-grey-800 font-semibold font-[cursive] text-[120%]">
            {category}
          </h3>
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
                  href={`/recipes/pdf/${pdf}`}
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
