/**
 * 平台检测服务
 * 用于检测当前运行平台
 */

class PlatformDetector {
  static getPlatform() {
    // 检查是否为 Electron
    if (window.electron !== undefined) {
      return 'desktop';
    }

    // 检查是否为 React Native
    if (global.nativeModules !== undefined) {
      return this.getReactNativePlatform();
    }

    // 检查是否为移动浏览器
    const userAgent = navigator.userAgent;
    if (/Android/i.test(userAgent)) {
      return 'android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return 'ios';
    }

    // 默认为 web
    return 'web';
  }

  static getReactNativePlatform() {
    const { Platform } = require('react-native');
    return Platform.OS; // 'ios', 'android'
  }

  static isDesktop() {
    return this.getPlatform() === 'desktop';
  }

  static isMobile() {
    const platform = this.getPlatform();
    return platform === 'android' || platform === 'ios';
  }

  static isAndroid() {
    return this.getPlatform() === 'android';
  }

  static isIOS() {
    return this.getPlatform() === 'ios';
  }

  static getDeviceInfo() {
    return {
      platform: this.getPlatform(),
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth || screen.width,
      screenHeight: window.innerHeight || screen.height,
      pixelRatio: window.devicePixelRatio || 1
    };
  }
}

export default PlatformDetector;
