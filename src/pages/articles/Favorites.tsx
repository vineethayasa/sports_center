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

const Favorites: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const ArticlesDispatch = useArticleDispatch();
  const SportsDispatch = useSportDispatch();
  const TeamsDispatch = useTeamDispatch();

  useEffect(() => {
    fetchArticles(ArticlesDispatch);
    fetchSports(SportsDispatch);
    fetchTeams(TeamsDispatch);
  }, [ArticlesDispatch, SportsDispatch, TeamsDispatch]);

  const state: any = useArticleState();
  const state2: any = useTeamState();
  const state3: any = useSportState();

  const { articles } = state;
  const { teams } = state2;
  const { sports } = state3;

  const filteredTeams = selectedSport
    ? teams.filter((team: Team) => team.plays === selectedSport)
    : [];

  const filteredArticles = articles.filter((article: Article) => {
    const isSportMatch =
      selectedSport === "" || article.sport.name === selectedSport;

    const isTeamMatch =
      selectedTeam === "" ||
      article.teams.some((team: Team) => team.name === selectedTeam);

    return isSportMatch && isTeamMatch;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 mt-2 ml-4 text-blue-600">
        Favorites
      </h2>
      <div className="overflow-y-auto p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select a Sport</option>
              {sports.map((sport: Sport) => (
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

        <div>
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
