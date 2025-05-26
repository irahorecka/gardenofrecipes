// src/App.jsx
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Directory from "./pages/Directory.jsx";
import Home from "./pages/Home.jsx";
import Recipe from "./pages/Recipe.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Directory />} />
        <Route path="/recipes/:slug" element={<Recipe />} />
      </Routes>
    </Layout>
  );
}
