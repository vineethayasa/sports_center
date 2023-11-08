/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchDispatch, useMatchState } from "../../context/matches/context";
import { Match } from "../../context/matches/reducer";
import Matches from "./Match";
import {
  usePreferenceDispatch,
  usePreferenceState,
} from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/actions";

const MatchesList: React.FC = () => {
  const dispatchMatches = useMatchDispatch();
  const dispatchPreferences = usePreferenceDispatch();

  useEffect(() => {
    fetchMatches(dispatchMatches);
    fetchPreferences(dispatchPreferences);
  }, [dispatchMatches, dispatchPreferences]);

  const state: any = useMatchState();
  const { matches, isLoading } = state;

  const state2: any = usePreferenceState();
  const { preferences } = state2;

  const checkAuthentication = () => {
    return !!localStorage.getItem("authToken");
  };

  const liveMatches = checkAuthentication()
    ? matches.filter((match: Match) => {
        if (match.sportName && preferences.favoriteSports) {
          const sportMatch = preferences.favoriteSports.includes(
            match.sportName,
          );
          const teamMatch = match.teams.some((team) =>
            preferences.favoriteTeams.includes(team.name),
          );

          if (sportMatch || teamMatch) {
            return match.isRunning;
          }
        }
        return false;
      })
    : matches.filter((match: Match) => {
        return match.isRunning;
      });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex space-x-4">
        {liveMatches.map((match: Match) => (
          <div
            key={match.id}
            className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4"
          >
            <Matches match={match} />
          </div>
        ))}
        {liveMatches.length === 0 && (
          <div className="text-red-500 text-lg font-bold mt-4">
            <p>No Live Matches</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesList;
