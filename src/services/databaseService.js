/**
 * 本地数据库服务
 * 使用 IndexedDB + SQLite (React Native)
 */

class DatabaseService {
  constructor() {
    this.dbName = 'DesktopPetDB';
    this.version = 2;
    this.stores = {
      petData: { keyPath: 'id' },
      chatHistory: { keyPath: 'id' },
      skins: { keyPath: 'id' },
      achievements: { keyPath: 'id' },
      friends: { keyPath: 'id' },
      leaderboard: { keyPath: 'id' },
      offlineQueue: { keyPath: 'id' }
    };
  }

  /**
   * 初始化数据库
   */
  async initialize() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // 创建所有存储
        Object.entries(this.stores).forEach(([name, config]) => {
          if (!db.objectStoreNames.contains(name)) {
            db.createObjectStore(name, config);
          }
        });

        console.log('✅ 数据库初始化完成');
      };
    });
  }

  /**
   * 保存宠物数据
   */
  async savePetData(petData) {
    const db = await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['petData'], 'readwrite');
      const store = transaction.objectStore('petData');
      const request = store.put({
        id: 'main',
        ...petData,
        updatedAt: Date.now()
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * 获取宠物数据
   */
  async getPetData() {
    const db = await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['petData'], 'readonly');
      const store = transaction.objectStore('petData');
      const request = store.get('main');

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * 保存聊天记录
   */
  async saveChatMessage(message) {
    const db = await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['chatHistory'], 'readwrite');
      const store = transaction.objectStore('chatHistory');
      const request = store.add({
        id: Date.now() + Math.random(),
        ...message,
        timestamp: Date.now()
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * 获取所有聊天记录
   */
  async getChatHistory(limit = 100) {
    const db = await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['chatHistory'], 'readonly');
      const store = transaction.objectStore('chatHistory');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const messages = request.result.sort((a, b) => a.timestamp - b.timestamp);
        resolve(messages.slice(-limit));
      };
    });
  }

  /**
   * 保存皮肤信息
   */
  async saveSkin(skin) {
    const db = await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['skins'], 'readwrite');
      const store = transaction.objectStore('skins');
      const request = store.put({
        id: skin.id,
        ...skin,
        createdAt: Date.now()
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * 获取所有皮肤
   */
  async getAllSkins() {
    const db = await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['skins'], 'readonly');
      const store = transaction.objectStore('skins');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * 保存成就
   */
  async saveAchievement(achievement) {
    const db = await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['achievements'], 'readwrite');
      const store = transaction.objectStore('achievements');
      const request = store.put({
        id: achievement.id,
        ...achievement,
        unlockedAt: Date.now()
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * 获取所有成就
   */
  async getAchievements() {
    const db = await this.initialize();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['achievements'], 'readonly');
      const store = transaction.objectStore('achievements');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  /**
   * 清空数据库
   */
  async clearAll() {
    const db = await this.initialize();
    for (const storeName of Object.keys(this.stores)) {
      await new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    }
    console.log('✅ 数据库已清空');
  }
}

const dbService = new DatabaseService();
export default dbService;
