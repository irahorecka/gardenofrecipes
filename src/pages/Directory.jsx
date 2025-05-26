import { Link } from "react-router-dom";

const recipeList = [
  { title: "Banana Muffins", slug: "banana-muffins" },
  // Add more recipes here as needed
];

export default function Directory() {
  return (
    <div className="prose">
      <h2>Recipes</h2>
      <ul>
        {recipeList.map(({ title, slug }) => (
          <li key={slug}>
            <Link to={`/recipes/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
