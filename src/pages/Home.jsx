import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="prose mx-auto text-center">
      <h1>Welcome to the Schoellman Recipe Archive</h1>
      <p>This is a digital collection of our family’s cherished recipes.</p>
      <Link to="/recipes" className="text-blue-600 underline">
        View Recipes
      </Link>
    </div>
  );
}
