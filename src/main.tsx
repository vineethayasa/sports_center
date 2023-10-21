import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ArticleProvider } from "./context/articles/context.tsx";
import { SportProvider } from "./context/sports/context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SportProvider>
      <ArticleProvider>
        <App />
      </ArticleProvider>
    </SportProvider>
  </React.StrictMode>,
);
