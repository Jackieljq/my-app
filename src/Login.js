import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // 引入自定义的CSS样式文件
import { User, Lock } from 'lucide-react'; // 引入图标
import logoImage from './logo_image.png';



function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 使用 useNavigate 代替 useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 发送登录请求到 Django 后端
    const response = await fetch('http://localhost:8000/accounts/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // const data = await response.json();
    if (response.ok) {
      // 保存用户名到 localStorage
      localStorage.setItem('username', username);

      // 调用父组件的 onLogin 方法，更新登录状态
      onLogin(username);

      navigate('/');
      //alert(`Info: ${data.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logoImage} alt="AASYP Logo" className="logo-image" />
        <h2 className="login-title">Welcome to AASYP Chat</h2>
        <p className="login-subtitle">Sign in to connect with your AASYP community</p>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <User className="input-icon h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="input-icon h-5 w-5 text-gray-400" />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Sign in</button>
        </form>

        <div className="register-link">
          Don't have an account? <Link to="/register" className="text-customOrange hover:text-customOrangeDark"><strong>Register</strong></Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
