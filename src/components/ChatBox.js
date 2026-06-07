import React, { useState, useRef, useEffect } from 'react';
import aiService from '../services/aiService';
import usePetStore from '../store/petStore';
import './ChatBox.css';

const ChatBox = ({ petState, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const aiConfig = usePetStore((state) => state.aiConfig);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // 添加用户消息
    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 获取 AI 回复
      const response = await aiService.getResponse(inputValue, petState);

      const aiMessage = {
        type: 'ai',
        text: response,
        timestamp: Date.now()
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        type: 'ai',
        text: '呃...我好像有点卡住了呢~ 😅',
        timestamp: Date.now()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>与小萌聊天 💬</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="empty-state">
            <p>和我聊天吧~ 我很想和你交流呢~ 💕</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message message-${msg.type}`}>
            <div className="message-content">
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message message-ai">
            <div className="message-content loading">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <textarea
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="输入消息..."
          rows="2"
        />
        <button
          className="send-btn"
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
        >
          发送 →
        </button>
      </div>

      {aiConfig.provider !== 'local' && (
        <div className="chat-footer">
          <small>使用 AI: {aiConfig.provider}</small>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
