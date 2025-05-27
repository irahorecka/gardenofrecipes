import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between text-gray-900 font-typewriter">
      <header className="py-6 mt-12 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-[cursive] tracking-wide">
          Garden of Recipes: Volume II
        </h1>
        <div className="mt-8 text-lg md:text-xl text-gray-800 leading-snug">
          <div>Collected by Agnes Schoellman</div>
          <div>Christmas 1988</div>
        </div>
        <div className="mt-6">
          <img
            src="/web-icon.png"
            alt="Decorative chef icon"
            className="mx-auto opacity-100"
            style={{
              imageRendering: "crisp-edges",
              width: "90px",
              height: "96px",
            }}
          />
        </div>
        <nav className="mt-4 text-lg text-gray-800 font-[cursive] underline">
          <Link to="/">← Back to Home</Link>
        </nav>
      </header>

      <div className="flex-grow">
        <div className="max-w-4xl w-full mx-auto px-4 md:px-8">
          <div
            className="h-6 opacity-80 mt-4 mb-8 md:mb-6"
            style={{
              backgroundImage: 'url("/pixel-flower-filled.png")',
              backgroundRepeat: "repeat-x",
              backgroundPosition: "center",
              imageRendering: "crisp-edges",
              backgroundSize: "36px 36px",
            }}
            role="presentation"
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-4xl w-full mx-auto px-4 md:px-8">
          <main className="relative z-10">{children}</main>
        </div>
        <div className="max-w-4xl w-full mx-auto px-4 md:px-8">
          <div
            className="h-6 opacity-80 mt-b mt-8 md:mt-6"
            style={{
              backgroundImage: 'url("/pixel-flower-filled.png")',
              backgroundRepeat: "repeat-x",
              backgroundPosition: "center",
              imageRendering: "crisp-edges",
              backgroundSize: "36px 36px",
            }}
            role="presentation"
            aria-hidden="true"
          />
        </div>
      </div>

      <footer className="text-center text-sm text-gray-800 mt-2 py-4">
        Schoellman Recipe Archive | Ira Horecka
      </footer>
    </div>
  );
}
