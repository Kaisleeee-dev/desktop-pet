import React from 'react';
import './Menu.css';

const Menu = ({ isOpen, onToggle, onFeed, onPlay, onRest, onClean }) => {
  return (
    <div className={`menu ${isOpen ? 'open' : ''}`}>
      <button className="menu-toggle" onClick={onToggle}>
        {isOpen ? '✕' : '⚙️'}
      </button>

      {isOpen && (
        <div className="menu-items">
          <button className="menu-item feed" onClick={onFeed}>
            <span className="icon">🍕</span>
            <span className="label">喂食</span>
          </button>
          <button className="menu-item play" onClick={onPlay}>
            <span className="icon">🎮</span>
            <span className="label">玩耍</span>
          </button>
          <button className="menu-item rest" onClick={onRest}>
            <span className="icon">😴</span>
            <span className="label">休息</span>
          </button>
          <button className="menu-item clean" onClick={onClean}>
            <span className="icon">🛁</span>
            <span className="label">洗澡</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
