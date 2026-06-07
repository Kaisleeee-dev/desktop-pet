/**
 * 云同步服务
 * 支持多设备间的数据同步
 */

import axios from 'axios';

const CLOUD_ENDPOINT = process.env.REACT_APP_CLOUD_API || 'https://api.desktop-pet.io';

class CloudSyncService {
  constructor() {
    this.userId = null;
    this.authToken = null;
    this.deviceId = this.generateDeviceId();
  }

  /**
   * 生成设备ID
   */
  generateDeviceId() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = 'device_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  }

  /**
   * 用户注册
   */
  async register(email, password, deviceType) {
    try {
      const response = await axios.post(`${CLOUD_ENDPOINT}/auth/register`, {
        email,
        password,
        deviceId: this.deviceId,
        deviceType // 'desktop', 'android', 'ios'
      });

      this.userId = response.data.userId;
      this.authToken = response.data.token;
      localStorage.setItem('authToken', this.authToken);
      localStorage.setItem('userId', this.userId);

      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * 用户登录
   */
  async login(email, password, deviceType) {
    try {
      const response = await axios.post(`${CLOUD_ENDPOINT}/auth/login`, {
        email,
        password,
        deviceId: this.deviceId,
        deviceType
      });

      this.userId = response.data.userId;
      this.authToken = response.data.token;
      localStorage.setItem('authToken', this.authToken);
      localStorage.setItem('userId', this.userId);

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * 上传宠物数据
   */
  async uploadPetData(petData) {
    try {
      if (!this.authToken) {
        console.warn('Not authenticated, skipping cloud sync');
        return;
      }

      const response = await axios.post(
        `${CLOUD_ENDPOINT}/pet/sync`,
        {
          petData,
          timestamp: Date.now(),
          deviceId: this.deviceId
        },
        {
          headers: {
            'Authorization': `Bearer ${this.authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
    }
  }

  /**
   * 下载宠物数据
   */
  async downloadPetData() {
    try {
      if (!this.authToken) {
        console.warn('Not authenticated, cannot download');
        return null;
      }

      const response = await axios.get(
        `${CLOUD_ENDPOINT}/pet/latest`,
        {
          headers: {
            'Authorization': `Bearer ${this.authToken}`
          }
        }
      );

      return response.data.petData;
    } catch (error) {
      console.error('Download error:', error);
      return null;
    }
  }

  /**
   * 获取所有绑定的设备
   */
  async getDevices() {
    try {
      const response = await axios.get(
        `${CLOUD_ENDPOINT}/devices`,
        {
          headers: {
            'Authorization': `Bearer ${this.authToken}`
          }
        }
      );

      return response.data.devices;
    } catch (error) {
      console.error('Get devices error:', error);
      return [];
    }
  }

  /**
   * 实时同步数据（WebSocket）
   */
  connectRealTimeSync(onUpdate) {
    if (!this.authToken) {
      console.warn('Not authenticated for real-time sync');
      return null;
    }

    const ws = new WebSocket(
      `${CLOUD_ENDPOINT.replace('http', 'ws')}/sync`,
      [this.authToken]
    );

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'pet-update') {
          onUpdate(data.petData, data.fromDeviceId);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return ws;
  }

  /**
   * 检查本地数据是否需要更新
   */
  async checkForUpdates() {
    try {
      const response = await axios.get(
        `${CLOUD_ENDPOINT}/pet/check-updates?lastSync=${localStorage.getItem('lastSync') || 0}`,
        {
          headers: {
            'Authorization': `Bearer ${this.authToken}`
          }
        }
      );

      return response.data.hasUpdates;
    } catch (error) {
      console.error('Check updates error:', error);
      return false;
    }
  }

  /**
   * 登出
   */
  logout() {
    this.userId = null;
    this.authToken = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
  }
}

const cloudSync = new CloudSyncService();
export default cloudSync;
