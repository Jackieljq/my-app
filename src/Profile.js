import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar" style={{ backgroundColor: '#ba68c8' }}>PS</div>
        <div className="profile-details">
          <h2 className="profile-name">Paul Sigar</h2>
          <p className="profile-username">@PaulSigar</p>
        </div>
      </div>

      <div className="profile-info">
        <div className="work-info">
          <h3>Work Info</h3>
          <p><span role="img" aria-label="briefcase">💼</span> CEO</p>
          <p><span role="img" aria-label="team">👥</span> Admin, ExecutionTeam</p>
          <p><span role="img" aria-label="phone">📞</span> +61 0400 123 456</p>
        </div>
        <div className="location-info">
          <h3>Location & Time Zone</h3>
          <p><span role="img" aria-label="location">📍</span> Perth, WA, AU</p>
          <p><span role="img" aria-label="clock">⏰</span> Australian Western Standard Time (AWST)</p>
        </div>
      </div>

      <div className="profile-action">
        <button className="admin-button">Access Admin System</button>
      </div>
    </div>
  );
};

export default Profile;
