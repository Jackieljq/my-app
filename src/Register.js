import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // 引入自定义的CSS样式文件

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 确保密码匹配
    if (password1 !== password2) {
      alert("Passwords do not match");
      return;
    }

    // 发送注册请求到 Django 后端
    const response = await fetch('http://localhost:8000/accounts/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password1,
        password2,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful!");
    } else {
      alert(`Registration failed: ${data.message}`);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create A New Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="register-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className="register-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="register-input"
            placeholder="Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
          <input
            type="password"
            className="register-input"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <button type="submit" className="register-btn">Sign Up</button>
        </form>
        <p className="login-link">
          Return back to <Link to="/login"><strong>login</strong></Link> page
        </p>
      </div>
    </div>
  );
}

export default Register;
