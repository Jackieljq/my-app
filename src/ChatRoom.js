import React, { useState, useEffect, useRef } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ChatRoom.css'; // 引入自定义的CSS文件

function ChatRoom({ roomName, username }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const socketRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 创建WebSocket连接
    socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

    // 接收消息事件处理程序
    socketRef.current.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log('Received data:', data); // 打印接收到的数据

      // 处理接收到的消息类型
      if (data.type === 'message') {
        setMessages((prevMessages) => [
          ...prevMessages,
          { username: data.username, message: data.message, timestamp: data.timestamp },
        ]);
      } else if (data.type === 'user_list') {
        setUsers(data.users);
      }
    };

    // 关闭WebSocket连接
    socketRef.current.onclose = function () {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomName]);

  const sendMessage = () => {
    if (message && socketRef.current) {
      const messageData = {
        type: 'message',
        username,
        message,
        timestamp: new Date().toLocaleTimeString(),
      };
      console.log('Sending message:', messageData); // 打印发送的数据
      socketRef.current.send(JSON.stringify(messageData));
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={24} />
        </button>
        <h2 className="room-title">Chat Room: {roomName}</h2>
      </div>

      <div className="chatroom-main">
        <div className="users-list">
          <h4 className="users-title">Online Users:</h4>
          <ul>
            {users.map((user, index) => (
              <li key={index} className="user-item">{user}</li>
            ))}
          </ul>
        </div>

        <div className="messages-list">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.username === username ? 'sent' : 'received'}`}>
              <div className="message-content">
                <p><strong>{msg.username}</strong> [{msg.timestamp}]: {msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chatroom-footer">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="message-input"
        />
        <button
          onClick={sendMessage}
          className="send-button"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
