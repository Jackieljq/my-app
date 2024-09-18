import React, { useState } from 'react';
import './Chats.css';

const Chats = ({ onSelectChat }) => {
  const [hoveredUser, setHoveredUser] = useState(null);

  const users = [
    {
      initials: 'JD',
      name: 'John Doe',
      message: 'Hello! How are you?',
      color: '#64b5f6',
      title: 'Software Engineer',
      location: 'New York, USA',
      timezone: 'EST (UTC-5)',
    },
    {
      initials: 'JS',
      name: 'Jane Smith',
      message: 'Are we still on for lunch?',
      color: '#81c784',
      title: 'Product Manager',
      location: 'London, UK',
      timezone: 'BST (UTC+1)',
    },
    {
      initials: 'TG',
      name: 'Tech Group',
      message: 'Alice: Has anyone tried the new framework?',
      color: '#ba68c8',
      title: 'Group Chat',
      location: 'Global',
      timezone: 'Various',
    },
    {
      initials: 'MT',
      name: 'Marketing Team',
      message: "Bob: Let's discuss the new campaign ideas.",
      color: '#ffb74d',
      title: 'Team Chat',
      location: 'San Francisco, USA',
      timezone: 'PST (UTC-8)',
    },
  ];

  // Handles displaying the tooltip only when hovering on the avatar.
  const handleMouseEnter = (user) => {
    setHoveredUser(user.name);
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
  };

  return (
    <div>
      <h2 className="section-title">Chats</h2>
      <div className="chat-list">
        {users.map((user) => (
          <div
            className="chat-room-item"
            key={user.name}
            onClick={() => {
              if (onSelectChat) {
                onSelectChat(user); // Safely call onSelectChat only if it's passed in
              }
            }}
          >
            {/* Avatar and Tooltip Trigger */}
            <div
              className="user-icon"
              style={{ backgroundColor: user.color }}
              onMouseEnter={() => handleMouseEnter(user)} // Show tooltip on avatar hover
              onMouseLeave={handleMouseLeave}            // Hide tooltip when leaving avatar
            >
              {user.initials}
            </div>

            {/* Chat Details (Name and Message) */}
            <div className="chat-details">
              <p className="chat-name">{user.name}</p>
              <p className="chat-message">{user.message}</p>
            </div>

            {/* Tooltip shows when hovering on the avatar */}
            {hoveredUser === user.name && (
              <div
                className="user-tooltip"
                onMouseEnter={() => setHoveredUser(user.name)}  // Keep tooltip displayed when hovered
                onMouseLeave={handleMouseLeave}                // Hide tooltip when leaving the tooltip itself
              >
                <div className="tooltip-content">
                  <div className="tooltip-header">
                    <span
                      className="tooltip-initials"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.initials}
                    </span>
                    <div className="tooltip-details">
                      <p className="tooltip-name">{user.name}</p>
                      <p className="tooltip-title">{user.title}</p>
                    </div>
                  </div>
                  <div className="tooltip-info">
                    <p className="tooltip-location">📍 {user.location}</p>
                    <p className="tooltip-timezone">⏰ {user.timezone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;

