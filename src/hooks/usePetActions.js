import { useCallback } from 'react';

/**
 * 宠物行为管理 Hook
 */
export const usePetActions = (setPetState) => {
  // 喂食
  const feed = useCallback(() => {
    setPetState(prevState => ({
      ...prevState,
      hunger: Math.max(0, prevState.hunger - 30),
      health: Math.min(100, prevState.health + 10),
      lastAction: 'feed',
      actionTime: Date.now()
    }));
  }, [setPetState]);

  // 玩耍
  const play = useCallback(() => {
    setPetState(prevState => ({
      ...prevState,
      happiness: Math.min(100, prevState.happiness + 25),
      energy: Math.max(0, prevState.energy - 20),
      hunger: Math.min(100, prevState.hunger + 15),
      lastAction: 'play',
      actionTime: Date.now()
    }));
  }, [setPetState]);

  // 休息
  const sleep = useCallback(() => {
    setPetState(prevState => ({
      ...prevState,
      energy: Math.min(100, prevState.energy + 40),
      happiness: Math.max(0, prevState.happiness - 5),
      lastAction: 'sleep',
      actionTime: Date.now()
    }));
  }, [setPetState]);

  // 洗澡
  const bath = useCallback(() => {
    setPetState(prevState => ({
      ...prevState,
      health: Math.min(100, prevState.health + 30),
      happiness: Math.min(100, prevState.happiness + 10),
      energy: Math.max(0, prevState.energy - 10),
      lastAction: 'bath',
      actionTime: Date.now()
    }));
  }, [setPetState]);

  // 点击互动
  const interact = useCallback(() => {
    setPetState(prevState => ({
      ...prevState,
      happiness: Math.min(100, prevState.happiness + 5),
      currentAnimation: 'happy',
      lastAction: 'interact',
      actionTime: Date.now()
    }));
  }, [setPetState]);

  // 自动衰减（每5秒触发一次）
  const decayStats = useCallback(() => {
    setPetState(prevState => {
      const timeSinceLastAction = Date.now() - (prevState.actionTime || 0);
      const hasBeenIdle = timeSinceLastAction > 5000;

      if (!hasBeenIdle) return prevState;

      return {
        ...prevState,
        hunger: Math.min(100, prevState.hunger + 1),
        energy: Math.max(0, prevState.energy - 0.5),
        happiness: Math.max(0, prevState.happiness - 1),
        health: Math.max(0, prevState.health - 0.2)
      };
    });
  }, [setPetState]);

  return {
    feed,
    play,
    sleep,
    bath,
    interact,
    decayStats
  };
};

export default usePetActions;
