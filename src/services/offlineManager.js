/**
 * 离线模式管理
 * 支持完整的离线功能和数据同步
 */

class OfflineManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.offlineQueue = [];
    this.syncInProgress = false;
    this.initializeListeners();
  }

  /**
   * 初始化网络状态监听
   */
  initializeListeners() {
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
  }

  /**
   * 处理网络恢复
   */
  async handleOnline() {
    this.isOnline = true;
    console.log('✅ 网络已连接，开始同步...');
    await this.syncOfflineQueue();
  }

  /**
   * 处理网络断开
   */
  handleOffline() {
    this.isOnline = false;
    console.log('⚠️ 网络已断开，已切换到离线模式');
  }

  /**
   * 添加操作到离线队列
   */
  async queueOperation(operation) {
    const queueItem = {
      id: Date.now() + Math.random(),
      operation,
      timestamp: Date.now(),
      retries: 0,
      maxRetries: 3
    };

    this.offlineQueue.push(queueItem);
    
    // 保存到 IndexedDB
    await this.saveToIndexedDB('offlineQueue', queueItem);

    // 如果在线立即尝试同步
    if (this.isOnline) {
      await this.syncOfflineQueue();
    }

    return queueItem.id;
  }

  /**
   * 同步离线队列
   */
  async syncOfflineQueue() {
    if (this.syncInProgress || !this.isOnline) return;

    this.syncInProgress = true;
    const failedItems = [];

    try {
      for (const item of this.offlineQueue) {
        try {
          await this.executeOperation(item.operation);
          await this.removeFromIndexedDB('offlineQueue', item.id);
          this.offlineQueue = this.offlineQueue.filter(i => i.id !== item.id);
        } catch (error) {
          item.retries++;
          if (item.retries < item.maxRetries) {
            failedItems.push(item);
          } else {
            console.error('❌ 操作最终失败:', item);
            await this.removeFromIndexedDB('offlineQueue', item.id);
          }
        }
      }

      this.offlineQueue = failedItems;
      console.log(`✅ 离线队列同步完成，剩余 ${failedItems.length} 个待同步操作`);
    } finally {
      this.syncInProgress = false;
    }
  }

  /**
   * 执行操作
   */
  async executeOperation(operation) {
    const { type, data } = operation;
    
    switch (type) {
      case 'syncPetData':
        return await this.syncPetData(data);
      case 'syncChat':
        return await this.syncChat(data);
      case 'updateProfile':
        return await this.updateProfile(data);
      default:
        throw new Error(`Unknown operation: ${type}`);
    }
  }

  /**
   * IndexedDB 操作
   */
  async saveToIndexedDB(storeName, data) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('DesktopPetDB', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        store.put(data);
        resolve();
      };
    });
  }

  /**
   * 从 IndexedDB 读取
   */
  async getFromIndexedDB(storeName, key) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('DesktopPetDB', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const getRequest = store.get(key);
        
        getRequest.onsuccess = () => resolve(getRequest.result);
        getRequest.onerror = () => reject(getRequest.error);
      };
    });
  }

  /**
   * 从 IndexedDB 删除
   */
  async removeFromIndexedDB(storeName, key) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('DesktopPetDB', 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const deleteRequest = store.delete(key);
        
        deleteRequest.onsuccess = () => resolve();
        deleteRequest.onerror = () => reject(deleteRequest.error);
      };
    });
  }

  /**
   * 获取离线状态
   */
  getStatus() {
    return {
      isOnline: this.isOnline,
      queueLength: this.offlineQueue.length,
      isSyncing: this.syncInProgress
    };
  }
}

const offlineManager = new OfflineManager();
export default offlineManager;
