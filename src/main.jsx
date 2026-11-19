// main.jsx – the entry point. It starts React and loads all the CSS files.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// CSS files (order matters: responsive.css goes last so it can override)
import "./styles/global.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import "./styles/games.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter enables page navigation without reloading */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);