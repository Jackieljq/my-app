import React, { useState } from 'react';
import './Friends.css';

const Friends = ({ onSelectFriend }) => {
  const friends = [
    { initials: 'JD', name: 'John Doe', status: 'Online', color: '#64b5f6' },
    { initials: 'JS', name: 'Jane Smith', status: 'Last seen 2h ago', color: '#81c784' },
    { initials: 'AB', name: 'Alice Brown', status: 'Offline', color: '#ffb74d' },
    { initials: 'BW', name: 'Bob Wilson', status: 'Online', color: '#f06292' },
  ];

  return (
    <div>
      <h2 className="section-title">Friends</h2>
      {friends.map((friend) => (
        <div
          className="friend-item"
          key={friend.name}
          onClick={() => onSelectFriend(friend)}
        >
          <div className="friend-icon" style={{ backgroundColor: friend.color }}>
            {friend.initials}
          </div>
          <div className="friend-details">
            <p className="friend-name">{friend.name}</p>
            <p className="friend-status">{friend.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
