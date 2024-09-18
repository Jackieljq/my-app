import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ChatRoom from './ChatRoom';
import Main from './Main';
import './tailwind.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // 检查 localStorage 中是否有用户信息
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username) => {
    setUsername(username);
    setIsAuthenticated(true);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    // 清除 localStorage 中的用户名并将用户标记为未登录
    localStorage.removeItem('username');
    setUsername('');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chatroom/:roomName"
            element={isAuthenticated ? <ChatRoom username={username} /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <Main username={username} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
