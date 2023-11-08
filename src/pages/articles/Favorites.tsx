/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  useArticleDispatch,
  useArticleState,
} from "../../context/articles/context";
import { useTeamDispatch, useTeamState } from "../../context/teams/context";
import { fetchArticles } from "../../context/articles/actions";
import { fetchSports } from "../../context/sports/actions";
import { fetchTeams } from "../../context/teams/actions";
import { useSportDispatch, useSportState } from "../../context/sports/context";
import Articles from "./Article";

import { Article } from "../../context/articles/reducer";
import { Sport } from "../../context/sports/reducer";
import { Team } from "../../context/teams/reducer";

import { fetchPreferences } from "../../context/preferences/actions";
import {
  usePreferenceDispatch,
  usePreferenceState,
} from "../../context/preferences/context";

const Favorites: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const ArticlesDispatch = useArticleDispatch();
  const SportsDispatch = useSportDispatch();
  const TeamsDispatch = useTeamDispatch();
  const PreferencesDispatch = usePreferenceDispatch();

  useEffect(() => {
    fetchArticles(ArticlesDispatch);
    fetchSports(SportsDispatch);
    fetchTeams(TeamsDispatch);
    fetchPreferences(PreferencesDispatch);
  }, [ArticlesDispatch, SportsDispatch, TeamsDispatch, PreferencesDispatch]);

  const state: any = useArticleState();
  const state2: any = useTeamState();
  const state3: any = useSportState();
  const state4: any = usePreferenceState();

  const { articles } = state;
  const { teams } = state2;
  const { sports } = state3;
  const { preferences } = state4;

  const checkAuthentication = () => {
    return !!localStorage.getItem("authToken");
  };

  const filteredSports = checkAuthentication()
    ? sports.filter((sport: Sport) =>
    preferences.favoriteSports && preferences.favoriteSports.includes(sport.name),
      )
    : sports;

  let filteredTeams = checkAuthentication()
    ? teams.filter(
        (team: Team) =>
        preferences.favoriteTeams && preferences.favoriteTeams.includes(team.name) &&
          team.plays === selectedSport,
      )
    : teams.filter((team: Team) => team.plays === selectedSport);

  const filterArticlesByPreferences = (article: Article) => {
    if (
      preferences &&
      preferences.favoriteTeams &&
      preferences.favoriteSports
    ) {
      const articleTeams = article.teams.map((team: Team) => team.name);
      if (
        articleTeams.some((team) => preferences.favoriteTeams.includes(team))
      ) {
        return true;
      }
      return preferences.favoriteSports.includes(article.sport.name);
    } else if (preferences && preferences.favoriteTeams) {
      const articleTeams = article.teams.map((team: Team) => team.name);
      return articleTeams.some((team) =>
      preferences.favoriteTeams && preferences.favoriteTeams.includes(team),
      );
    } else if (preferences && preferences.favoriteSports) {
      return preferences.favoriteSports.includes(article.sport.name);
    }
    return true;
  };

  let filteredArticles = articles.filter((article: Article) => {
    const isSportMatch =
      selectedSport === "" || article.sport.name === selectedSport;

    const isTeamMatch =
      selectedTeam === "" ||
      article.teams.some((team: Team) => team.name === selectedTeam);
    return isSportMatch && isTeamMatch;
  });

  if (checkAuthentication() && selectedTeam === "" && selectedSport === "") {
    filteredArticles = articles.filter((article: Article) =>
      filterArticlesByPreferences(article),
    );
  }
  if (checkAuthentication() && selectedSport && filteredTeams.length === 0) {
    filteredTeams = teams.filter((team: Team) => team.plays === selectedSport);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 mt-2 ml-2 text-blue-600">
        Favorites
      </h2>
      <div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a Sport</option>
              {filteredSports.map((sport: Sport) => (
                <option key={sport.id} value={sport.name}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a Team</option>
              {filteredTeams.map((team: Team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ height: "500px", overflowY: "scroll" }}>
          {filteredArticles.map((article: Article) => (
            <div key={article.id} className="bg-white p-4 m-2 rounded mt-4">
              <h3 className="text-lg font-bold text-blue-600">
                {article.title}
              </h3>
              <p className="text-m mt-2 mb-1">{article.summary}</p>
              <Articles article={article} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Favorites;
