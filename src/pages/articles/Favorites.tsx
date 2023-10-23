import React, { useState } from "react";

const Favorites: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const sports = ["Sport 1", "Sport 2", "Sport 3"];
  const teams = ["Team 1", "Team 2", "Team 3"];

  return (
    <div className="overflow-y-auto p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="sportDropdown">Select Sport:</label>
          <select
            id="sportDropdown"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            <option value="">Select a Sport</option>
            {sports.map((sport, index) => (
              <option key={index} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="teamDropdown">Select Team:</label>
          <select
            id="teamDropdown"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="">Select a Team</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
