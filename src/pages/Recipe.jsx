import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import RecipesLayout from "../components/RecipesLayout";
import recipeIndex from "../data/recipeIndex.json";

export default function Recipe() {
  const { slug } = useParams();
  const [md, setMd] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    fetch(`/recipes/md/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.text();
      })
      .then(setMd)
      .catch(() => {
        setMd(`# Recipe not found: ${slug}`);
      });

    // Lookup PDF URL from imported JSON
    const entry = Object.values(recipeIndex)
      .flatMap((section) => section.recipes)
      .find((r) => r.slug === slug);
    if (entry?.pdf) {
      setPdfUrl(`/recipes/pdf/${entry.pdf}`);
    } else {
      setPdfUrl("");
    }
  }, [slug]);

  return (
    <RecipesLayout>
      <article className="prose prose-stone prose-sm md:prose-base font-typewriter break-words text-[110%]">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => {
              const text = String(props.children);
              return (
                <div className="[&+div]:mt-8 mb-4">
                  <h1 className="text-2xl font-bold uppercase tracking-wide">
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {text}
                    </a>
                  </h1>
                </div>
              );
            },
            h2: ({ node, ...props }) => {
              const text = String(props.children);
              return (
                <div className="mb-4">
                  <h2 className="text-xl uppercase tracking-wide">{text}</h2>
                  <div
                    className="text-sm text-gray-800 leading-tight"
                    style={{ letterSpacing: "0.2em" }}
                  >
                    {"*".repeat(text.length * 1.2)}
                  </div>
                </div>
              );
            },
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside mt-2 mb-8" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside mt-2" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-0" {...props} />,
            p: ({ node, ...props }) => (
              <p className="first:mb-4 mb-8" {...props} />
            ),
          }}
        >
          {md}
        </ReactMarkdown>
        <nav className="mt-8 text-lg text-gray-800 font-semibold font-[cursive] underline">
          <Link to="/">← Back to Home</Link>
        </nav>
      </article>
    </RecipesLayout>
  );
}
