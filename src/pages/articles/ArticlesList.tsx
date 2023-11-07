/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticleDispatch } from "../../context/articles/context";
import { fetchSports } from "../../context/sports/actions";
import { useSportDispatch, useSportState } from "../../context/sports/context";
import ArticlesListItems from "./ArticlesListItems";
import {
  usePreferenceDispatch,
  usePreferenceState,
} from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/actions";
import { Sport } from "../../context/sports/reducer";

const ArticlesList: React.FC = () => {
  const dispatchArticles = useArticleDispatch();
  const dispatchSports = useSportDispatch();
  const dispatchPreferences = usePreferenceDispatch();

  const [filteredSports, setFilteredSports] = useState<string[]>([]);

  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    fetchArticles(dispatchArticles);
    fetchSports(dispatchSports);

    if (isAuthenticated) {
      fetchPreferences(dispatchPreferences);
    }
  }, [dispatchArticles, dispatchSports, dispatchPreferences]);

  const state: any = useSportState();
  const { sports } = state;

  const state2: any = usePreferenceState();
  const { preferences } = state2;

  useEffect(() => {
    if (preferences && preferences.favoriteSports) {
      const commonSports = sports.filter((sport: Sport) =>
        preferences.favoriteSports.includes(sport.name),
      );
      setFilteredSports(commonSports);
    }
  }, [preferences, sports]);

  const checkAuthentication = () => {
    return !!localStorage.getItem("authToken");
  };

  return (
    <div>
      <ArticlesListItems
        sports={filteredSports.length ? filteredSports : sports}
      />
    </div>
  );
};

export default ArticlesList;
