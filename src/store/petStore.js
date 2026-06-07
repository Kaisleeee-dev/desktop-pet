/**
 * 宠物状态存储 (Zustand)
 * 支持跨平台状态同步
 */

import create from 'zustand';
import { persist } from 'zustand/middleware';
import cloudSync from '../services/cloudSync';

const usePetStore = create(
  persist(
    (set, get) => ({
      // 宠物属性
      petData: {
        hunger: 50,
        happiness: 70,
        energy: 80,
        health: 90,
        x: 0,
        y: 0,
        currentAnimation: 'idle',
        name: '小萌',
        level: 1,
        experience: 0,
        lastUpdated: Date.now()
      },

      // 用户认证
      user: {
        id: null,
        email: null,
        isLoggedIn: false,
        deviceType: null
      },

      // 云同步状态
      syncStatus: {
        isSyncing: false,
        lastSync: null,
        isOnline: true
      },

      // AI 配置
      aiConfig: {
        provider: 'local',
        apiKey: null,
        enabled: true
      },

      // 更新宠物数据
      updatePetData: (newData) => set((state) => ({
        petData: {
          ...state.petData,
          ...newData,
          lastUpdated: Date.now()
        }
      })),

      // 设置用户信息
      setUser: (user) => set({ user: { ...user, isLoggedIn: true } }),

      // 登出
      logout: () => set({
        user: {
          id: null,
          email: null,
          isLoggedIn: false,
          deviceType: null
        }
      }),

      // 更新同步状态
      setSyncStatus: (status) => set((state) => ({
        syncStatus: { ...state.syncStatus, ...status }
      })),

      // 设置 AI 配置
      setAIConfig: (config) => set((state) => ({
        aiConfig: { ...state.aiConfig, ...config }
      })),

      // 上传到云端
      syncToCloud: async () => {
        set({ syncStatus: { isSyncing: true, lastSync: null, isOnline: true } });
        try {
          const petData = get().petData;
          await cloudSync.uploadPetData(petData);
          set((state) => ({
            syncStatus: {
              ...state.syncStatus,
              isSyncing: false,
              lastSync: Date.now(),
              isOnline: true
            }
          }));
        } catch (error) {
          console.error('Sync error:', error);
          set((state) => ({
            syncStatus: {
              ...state.syncStatus,
              isSyncing: false,
              isOnline: false
            }
          }));
        }
      },

      // 从云端同步
      syncFromCloud: async () => {
        try {
          const cloudData = await cloudSync.downloadPetData();
          if (cloudData) {
            set({ petData: cloudData });
            set((state) => ({
              syncStatus: {
                ...state.syncStatus,
                lastSync: Date.now()
              }
            }));
          }
        } catch (error) {
          console.error('Download error:', error);
        }
      }
    }),
    {
      name: 'pet-store',
      storage: localStorage
    }
  )
);

export default usePetStore;
