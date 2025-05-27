import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import RecipesLayout from "../components/RecipesLayout";

export default function Recipe() {
  const { slug } = useParams();
  const [md, setMd] = useState("");

  useEffect(() => {
    fetch(`/recipes/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.text();
      })
      .then(setMd)
      .catch(() => {
        setMd(`# Recipe not found: ${slug}`);
      });
  }, [slug]);

  return (
    <RecipesLayout>
      <article className="prose prose-stone prose-sm md:prose-base font-typewriter break-words text-[110%]">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="my-4 text-2xl md:text-3xl font-bold uppercase tracking-wide"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => {
              const text = String(props.children);
              return (
                <div className="mb-4">
                  <h2 className="text-xl font-semibold uppercase tracking-wide">
                    {text}
                  </h2>
                  <div
                    className="text-sm text-gray-800 font-mono leading-tight"
                    style={{ letterSpacing: "0.3em" }}
                  >
                    {"*".repeat(text.length)}
                  </div>
                </div>
              );
            },
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside mt-2 mb-6" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside mt-2" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-0" {...props} />,
            p: ({ node, ...props }) => <p className="mb-10" {...props} />,
          }}
        >
          {md}
        </ReactMarkdown>
        <nav className="mt-10 text-lg text-gray-800 font-[cursive] underline">
          <Link to="/">← Back to Home</Link>
        </nav>
      </article>
    </RecipesLayout>
  );
}
