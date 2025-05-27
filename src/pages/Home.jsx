import { Link } from "react-router-dom";

const recipeList = [
  { title: "Banana Muffins", slug: "banana-muffins" },
  // Add more recipes here as needed
];

export default function Home() {
  return (
    <div className="prose mx-auto py-2 text-center text-[110%] max-w-prose">
      <h1 className="mb-8 text-lg">Welcome to the Schoellman Recipe Archive</h1>
      <p>
        This is a digital preservation of a family recipe book lovingly compiled
        by Agnes Schoellman and others. Once gifted in print to Joe Horecka, it
        now finds a quiet home on the web.
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
        className="my-6 text-gray-800 font-mono text-base text-center"
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
      <h2 className="mb-4 text-lg font-semibold tracking-wide text-center">
        Recipes
      </h2>
      <ul className="list-none mx-auto text-left pl-8 max-w-prose">
        {recipeList.map(({ title, slug }) => (
          <li key={slug} className="my-2">
            <Link to={`/recipes/${slug}`} className="underline">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
