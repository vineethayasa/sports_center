/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchDispatch, useMatchState } from "../../context/matches/context";
import { Match } from "../../context/matches/reducer";
import Matches from "./Match";

const MatchesList: React.FC = () => {
  const dispatchMatches = useMatchDispatch();

  useEffect(() => {
    fetchMatches(dispatchMatches);
  }, []);

  const state: any = useMatchState();
  const { matches } = state;
  const liveMatches = matches.filter((match: Match) => match.isRunning);

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
      </div>
    </div>
  );
};

export default MatchesList;
