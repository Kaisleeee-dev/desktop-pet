import React from 'react';
import './PetStats.css';

const PetStats = ({ state }) => {
  const getHealthStatus = () => {
    if (state.health >= 75) return '健康';
    if (state.health >= 50) return '正常';
    if (state.health >= 25) return '虚弱';
    return '危险';
  };

  const getHappinessStatus = () => {
    if (state.happiness >= 75) return '非常开心';
    if (state.happiness >= 50) return '开心';
    if (state.happiness >= 25) return '不开心';
    return '非常悲伤';
  };

  return (
    <div className="pet-stats">
      <div className="stat-item">
        <div className="stat-label">饥饿度</div>
        <div className="stat-bar">
          <div 
            className="stat-fill hunger" 
            style={{ width: `${state.hunger}%` }}
          ></div>
        </div>
        <div className="stat-value">{Math.round(state.hunger)}</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">快乐度</div>
        <div className="stat-bar">
          <div 
            className="stat-fill happiness" 
            style={{ width: `${state.happiness}%` }}
          ></div>
        </div>
        <div className="stat-value">{getHappinessStatus()}</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">能量值</div>
        <div className="stat-bar">
          <div 
            className="stat-fill energy" 
            style={{ width: `${state.energy}%` }}
          ></div>
        </div>
        <div className="stat-value">{Math.round(state.energy)}</div>
      </div>

      <div className="stat-item">
        <div className="stat-label">健康度</div>
        <div className="stat-bar">
          <div 
            className="stat-fill health" 
            style={{ width: `${state.health}%` }}
          ></div>
        </div>
        <div className="stat-value">{getHealthStatus()}</div>
      </div>
    </div>
  );
};

export default PetStats;
