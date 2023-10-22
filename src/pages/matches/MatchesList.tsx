/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchDispatch, useMatchState } from "../../context/matches/context";
import { Match } from "../../context/matches/reducer";

const MatchesList: React.FC = () => {
  const dispatchMatches = useMatchDispatch();

  useEffect(() => {
    fetchMatches(dispatchMatches);
  }, []);

  const state: any = useMatchState();
  const { matches } = state;

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex space-x-4">
        {matches.map((match: Match) => (
          <div
            key={match.id}
            className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-lg font-semibold mb-2">{match.sportName}</h3>
            <p>
              <strong>Location:</strong> {match.location}
            </p>
            <p>{match.name}</p>
            {/* <p><strong>Ends At:</strong> {match.endsAt}</p>
            <p><strong>Is Running:</strong> {match.isRunning ? "Yes" : "No"}</p> */}
            <p>
              <strong>Teams:</strong>
            </p>
            <ul className="pl-4">
              {match.teams.map((team) => (
                <li key={team.id}>{team.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesList;
