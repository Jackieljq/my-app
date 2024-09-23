import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    title: '',
    phone: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Optionally, hide the form after submission
    setFormVisible(false);
  };

  return (
    <div className="profile-container">
      {isFormVisible ? (
        <div className="admin-form-container">
          <button className="back-button" onClick={() => setFormVisible(false)}>Back</button>
          <form className="admin-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Admin Form</h3>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Department:
              <input type="text" name="department" value={formData.department} onChange={handleChange} required />
            </label>
            <label>
              Position:
              <input type="text" name="position" value={formData.position} onChange={handleChange} required />
            </label>
            <label>
              Title:
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </label>
            <label>
              Phone:
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>
              Location:
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <>
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
            <button className="admin-button" onClick={() => setFormVisible(true)}>
              Access Admin System
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;