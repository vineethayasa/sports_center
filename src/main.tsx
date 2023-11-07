import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ArticleProvider } from "./context/articles/context.tsx";
import { SportProvider } from "./context/sports/context.tsx";
import { MatchProvider } from "./context/matches/context.tsx";
import { TeamProvider } from "./context/teams/context.tsx";
import { PreferenceProvider } from "./context/preferences/context.tsx";
import { UserProvider } from "./context/user/context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <SportProvider>
        <ArticleProvider>
          <MatchProvider>
            <TeamProvider>
              <PreferenceProvider>
                <App />
              </PreferenceProvider>
            </TeamProvider>
          </MatchProvider>
        </ArticleProvider>
      </SportProvider>
    </UserProvider>
  </React.StrictMode>,
);
