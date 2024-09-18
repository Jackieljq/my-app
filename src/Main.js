import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, List } from 'lucide-react';
import './Main.css'; // Assuming you have a CSS file linked

function Main({ username, onLogout }) {
  const [roomName, setRoomName] = useState('');
  const [chatRooms, setChatRooms] = useState([]);
  const [showCreateRoom, setShowCreateRoom] = useState(false); // 控制是否显示创建房间
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatRooms = () => {
      setChatRooms(['General', 'Technology', 'Gaming']);
    };
    fetchChatRooms();
  }, []);

  const createRoom = () => {
    if (roomName) {
      setChatRooms([...chatRooms, roomName]);
      setRoomName('');
      setShowCreateRoom(false); // 成功创建房间后，隐藏创建房间输入框
    }
  };

  const joinRoom = (room) => {
    navigate(`/chatroom/${room}`);
  };

  const toggleShowCreateRoom = () => {
    setShowCreateRoom((prev) => !prev); // 切换是否显示创建房间
  };

  return (
    <div className="main-container">
      {/* Sidebar 侧边栏 */}
      <nav className="sidebar">
        <h2 className="menu-title">Menu</h2>
        <ul className="menu-items">
          <li className="nav-item">
            <button className="nav-button" onClick={() => setShowCreateRoom(false)}>
              <List className="icon" />
              <span>Home</span> {/* 显示聊天列表 */}
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-button" onClick={setShowCreateRoom}>
              <PlusCircle className="icon" />
              <span>Add Chat Room</span> {/* 在侧边栏新增“添加聊天” */}
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-button logout" onClick={onLogout}>
              <LogOut className="icon" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Main content 主内容 */}
      <div className="main-content">
        <div className="welcome-section">
          <h2>Welcome, {username}</h2>
        </div>

        {/* Conditionally display the chat rooms or create room section */}
        {showCreateRoom ? (
          <div className="create-room-section">
            <h3>Create a New Chat Room</h3>
            <div className="input-container">
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
                className="input"
              />
              <button
                onClick={createRoom}
                className="create-room-button"
              >
                <PlusCircle className="icon" />
                <span>Create Room</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="chat-rooms-section">
            <h3>Available Chat Rooms</h3>
            <div className="chat-rooms-list">
              {chatRooms.map((room, index) => (
                <div
                  key={index}
                  className="chat-room-item"
                  onClick={() => joinRoom(room)}
                >
                  <p>{room}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
