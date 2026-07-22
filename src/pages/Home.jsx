import { recipeSources } from "../data/recipes.js";
import RecipesSearch from "../components/RecipesSearch";
import VolumeRecipeIndex from "../components/VolumeRecipeIndex";

export default function Home() {
  return (
    <>
      <div className="prose mx-auto py-1 text-center text-[110%] max-w-prose">
        <h1 className="mb-6 text-[180%] font-semibold font-cursive">
          Schoellman Recipe Archive
        </h1>
        <p>
          A digital preservation of a family recipe archive, spanning two
          volumes inspired by Texas Czech cuisine and lovingly compiled by
          Agnes Schoellman and others. Once gifted in print to Joe Horecka,
          it now finds a quiet home on the web.
        </p>
        <p className="mt-4 mb-6">
          A full scan of Volume II's original spiral-bound edition is
          available for download{" "}
          <a
            href={recipeSources[2].completePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            here
          </a>
          .
        </p>
        <RecipesSearch autoFocus />
        <div
          className="mt-8 mb-6 text-gray-800 text-base text-center"
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
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 items-start">
        <VolumeRecipeIndex volume={1} />
        <VolumeRecipeIndex volume={2} />
      </div>
    </>
  );
}
