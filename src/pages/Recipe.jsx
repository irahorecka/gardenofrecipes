import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

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
    <article className="prose prose-neutral mx-auto px-4 py-6">
      <ReactMarkdown>{md}</ReactMarkdown>
    </article>
  );
}
