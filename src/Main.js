import React, { useState } from 'react';
import { Search, MessageCircle, Users, User, LogOut, Paperclip, Camera, Video, Send } from 'lucide-react';
import './Main.css';
import Chats from './Chats'; // Import the Chats component
import Friends from './Friends'; // Ensure Friends.js is imported

// AASYP Logo component
const AASYPLogo = () => (
  <img src="path/to/logo_image.png" alt="AASYP Logo" className="logo-image" />
);

// Sidebar Navigation component
const Sidebar = ({ activeTab, onTabChange, onLogout }) => (
  <nav className="sidebar">
    <AASYPLogo />
    <h2 className="menu-title">AASYP Chat</h2>
    <ul className="menu-items">
      <li className="nav-item">
        <button
          className={`nav-button ${activeTab === 'chats' ? 'active' : ''}`}
          onClick={() => onTabChange('chats')}
        >
          <MessageCircle className="icon" />
          <span>Chats</span>
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-button ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => onTabChange('friends')}
        >
          <Users className="icon" />
          <span>Friends</span>
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-button ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => onTabChange('teams')}
        >
          <Users className="icon" />
          <span>Teams</span>
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => onTabChange('profile')}
        >
          <User className="icon" />
          <span>Profile</span>
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
);

// ChatRoom component for individual chat interactions
const ChatRoom = ({ selectedChat, messages, onBack }) => (
  <div className="chat-room">
    <div className="chat-header">
      <button className="back-button" onClick={onBack}>&larr;</button>
      <div className="user-icon" style={{ backgroundColor: selectedChat.color }}>{selectedChat.initials}</div>
      <div className="chat-header-details">
        <p className="chat-name">{selectedChat.name}</p>
        <p className="chat-status">Online</p>
      </div>
    </div>
    <div className="chat-room-messages">
      {messages.map((msg, index) => (
        <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
      ))}
    </div>
    <div className="chat-room-input">
      <input type="text" placeholder="Type a message..." className="input" />
      <button className="send-button"><Send size={18} /></button>
      <button className="attachment-button"><Paperclip size={18} /></button>
      <button className="camera-button"><Camera size={18} /></button>
      <button className="video-button"><Video size={18} /></button>
    </div>
  </div>
);

// Main Component
const Main = ({ username, onLogout }) => {
  const [activeTab, setActiveTab] = useState('chats'); // Default to 'chats'
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({
    'John Doe': [{ sender: 'John Doe', text: 'Hi there! How are you today?' }],
    'Jane Smith': [{ sender: 'Jane Smith', text: 'Lunch at 1pm?' }],
    'Tech Group': [{ sender: 'Alice', text: 'Has anyone tried the new framework?' }],
    'Marketing Team': [{ sender: 'Bob', text: 'Let\'s discuss the new campaign ideas.' }]
  });

  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedChat(null);
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
  };

  const renderContent = () => {
    if (selectedChat) {
      return <ChatRoom selectedChat={selectedChat} messages={chatMessages[selectedChat.name]} onBack={handleBackToChats} />;
    }

    switch (activeTab) {
      case 'chats':
        return <Chats onSelectChat={handleSelectChat} />; // Chats component loaded here
      case 'friends':
        return <div><h2 className="section-title">Friends</h2></div>;
      case 'teams':
        return <div><h2 className="section-title">Teams</h2></div>;
      case 'profile':
        return <div><h2 className="section-title">Profile</h2></div>;
      default:
        return <Chats onSelectChat={handleSelectChat} />;
    }
  };


  return (
    <div className="main-container">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} onLogout={onLogout} />

      <div className="main-content">
        <div className="search-bar">
          <Search className="icon" />
          <input type="text" placeholder="Search..." />
        </div>

        {renderContent()}
      </div>
    </div>
  );
};



export default Main;
