import React, { useState } from 'react';
import './Teams.css';

const Teams = ({ onSelectTeam }) => {
  const teams = [
    { initials: 'MT', name: 'Marketing Team', message: 'Bob: Let\'s discuss the new campaign ideas.', color: '#ffb74d' },
    { initials: 'DT', name: 'Development Team', message: 'Alice: Has anyone tried the new framework?', color: '#ba68c8' }
  ];

  return (
    <div>
      <h2 className="section-title">Teams</h2>
      {teams.map((team) => (
        <div
          className="team-item"
          key={team.name}
          onClick={() => onSelectTeam(team)}
        >
          <div className="team-icon" style={{ backgroundColor: team.color }}>
            {team.initials}
          </div>
          <div className="team-details">
            <p className="team-name">{team.name}</p>
            <p className="team-message">{team.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Teams;
