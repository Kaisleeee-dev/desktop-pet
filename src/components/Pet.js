import React, { useEffect, useState } from 'react';
import './Pet.css';

const Pet = ({ state, onClick }) => {
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 4);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const getAnimationClass = () => {
    if (state.currentAnimation === 'happy') return 'happy';
    if (state.currentAnimation === 'walk') return 'walk';
    if (state.energy < 20) return 'tired';
    if (state.happiness < 30) return 'sad';
    return 'idle';
  };

  return (
    <div 
      className={`pet ${getAnimationClass()}`}
      style={{
        left: state.x,
        top: state.y,
        animation: getAnimationClass() === 'walk' ? `bob 0.6s ease-in-out infinite` : 'none'
      }}
      onClick={onClick}
    >
      <div className="pet-inner">
        {/* 头部 */}
        <div className="head">
          {/* 左眼 */}
          <div className="eye eye-left">
            <div className="pupil"></div>
          </div>
          {/* 右眼 */}
          <div className="eye eye-right">
            <div className="pupil"></div>
          </div>
          {/* 嘴巴 */}
          <div className="mouth"></div>
        </div>
        {/* 身体 */}
        <div className="body">
          {/* 左耳 */}
          <div className="ear ear-left"></div>
          {/* 右耳 */}
          <div className="ear ear-right"></div>
        </div>
        {/* 左手 */}
        <div className="arm arm-left"></div>
        {/* 右手 */}
        <div className="arm arm-right"></div>
        {/* 左脚 */}
        <div className="leg leg-left"></div>
        {/* 右脚 */}
        <div className="leg leg-right"></div>
        {/* 尾巴 */}
        <div className="tail"></div>
      </div>
    </div>
  );
};

export default Pet;
