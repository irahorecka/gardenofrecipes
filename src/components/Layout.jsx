import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen text-gray-900 font-typewriter">
      <header className="border-b py-6 px-4 text-center">
        <h1 className="text-3xl font-bold">
          <Link to="/">Schoellman Recipes</Link>
        </h1>
      </header>
      <main className="max-w-4xl w-full mx-auto px-4 md:px-8 py-10 mb-6">
        {children}
      </main>
      <footer className="text-center text-sm text-gray-500 p-4">
        © {new Date().getFullYear()} Schoellman Family Archive
      </footer>
    </div>
  );
}
