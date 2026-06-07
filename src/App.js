import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Pet from './components/Pet';
import PetStats from './components/PetStats';
import Menu from './components/Menu';

function App() {
  const [petState, setPetState] = useState({
    hunger: 50,
    happiness: 70,
    energy: 80,
    health: 90,
    x: window.innerWidth / 2 - 75,
    y: window.innerHeight - 250,
    currentAnimation: 'idle'
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const animationRef = useRef(null);

  // 定时更新宠物状态
  useEffect(() => {
    const interval = setInterval(() => {
      setPetState(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 0.5),
        happiness: Math.max(0, prev.happiness - 0.3),
        energy: Math.max(0, prev.energy - 0.2),
        health: Math.max(0, Math.min(100, prev.health - 0.1))
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleFeed = () => {
    setPetState(prev => ({
      ...prev,
      hunger: Math.max(0, prev.hunger - 30),
      health: Math.min(100, prev.health + 5)
    }));
  };

  const handlePlay = () => {
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      energy: Math.max(0, prev.energy - 15),
      hunger: Math.min(100, prev.hunger + 5)
    }));
  };

  const handleRest = () => {
    setPetState(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 30),
      hunger: Math.min(100, prev.hunger + 5)
    }));
  };

  const handleClean = () => {
    setPetState(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 20)
    }));
  };

  const handleMouseMove = (e) => {
    if (!menuOpen) {
      const petSize = 150;
      let newX = e.clientX - petSize / 2;
      let newY = e.clientY - petSize / 2;

      newX = Math.max(0, Math.min(newX, window.innerWidth - petSize));
      newY = Math.max(0, Math.min(newY, window.innerHeight - petSize));

      setPetState(prev => ({
        ...prev,
        x: newX,
        y: newY,
        currentAnimation: 'walk'
      }));
    }
  };

  const handlePetClick = () => {
    setPetState(prev => ({
      ...prev,
      currentAnimation: 'happy'
    }));
    setTimeout(() => {
      setPetState(prev => ({
        ...prev,
        currentAnimation: 'idle'
      }));
    }, 500);
  };

  return (
    <div className="app" onMouseMove={handleMouseMove}>
      <div className="pet-container">
        <Pet 
          state={petState} 
          onClick={handlePetClick}
        />
      </div>
      <PetStats state={petState} />
      <Menu 
        isOpen={menuOpen}
        onToggle={() => setMenuOpen(!menuOpen)}
        onFeed={handleFeed}
        onPlay={handlePlay}
        onRest={handleRest}
        onClean={handleClean}
      />
    </div>
  );
}

export default App;
