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

  initializeListeners() {
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
  }

  async handleOnline() {
    this.isOnline = true;
    console.log('✅ 网络已连接，开始同步...');
    await this.syncOfflineQueue();
  }

  handleOffline() {
    this.isOnline = false;
    console.log('⚠️ 网络已断开，已切换到离线模式');
  }

  async queueOperation(operation) {
    const queueItem = {
      id: Date.now() + Math.random(),
      operation,
      timestamp: Date.now(),
      retries: 0,
      maxRetries: 3
    };

    this.offlineQueue.push(queueItem);
    if (this.isOnline) {
      await this.syncOfflineQueue();
    }

    return queueItem.id;
  }

  async syncOfflineQueue() {
    if (this.syncInProgress || !this.isOnline) return;
    this.syncInProgress = true;
    const failedItems = [];

    try {
      for (const item of this.offlineQueue) {
        try {
          await this.executeOperation(item.operation);
          this.offlineQueue = this.offlineQueue.filter(i => i.id !== item.id);
        } catch (error) {
          item.retries++;
          if (item.retries < item.maxRetries) {
            failedItems.push(item);
          }
        }
      }
      this.offlineQueue = failedItems;
    } finally {
      this.syncInProgress = false;
    }
  }

  async executeOperation(operation) {
    const { type, data } = operation;
    switch (type) {
      case 'syncPetData':
        return await this.syncPetData(data);
      default:
        throw new Error(`Unknown operation: ${type}`);
    }
  }

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
