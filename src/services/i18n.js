/**
 * 多语言支持 (i18n)
 */

const translations = {
  zh: {
    common: { yes: '是', no: '否', cancel: '取消', confirm: '确认', save: '保存' },
    pet: { name: '小萌', hungry: '我肚子有点饿呢...', happy: '和你在一起真开心！' },
    chat: { title: '与小萌聊天', placeholder: '输入消息...', send: '发送' },
    stats: { hunger: '饥饿度', happiness: '快乐度', energy: '能量值', health: '健康度' },
    menu: { feed: '喂食', play: '玩耍', rest: '休息', clean: '洗澡', shop: '商店' },
    offline: { online: '在线', offline: '离线模式', syncing: '正在同步...' }
  },
  en: {
    common: { yes: 'Yes', no: 'No', cancel: 'Cancel', confirm: 'Confirm', save: 'Save' },
    pet: { name: 'Cutie', hungry: 'I\'m a bit hungry...', happy: 'It\'s so fun to be with you!' },
    chat: { title: 'Chat with Cutie', placeholder: 'Type a message...', send: 'Send' },
    stats: { hunger: 'Hunger', happiness: 'Happiness', energy: 'Energy', health: 'Health' },
    menu: { feed: 'Feed', play: 'Play', rest: 'Rest', clean: 'Clean', shop: 'Shop' },
    offline: { online: 'Online', offline: 'Offline Mode', syncing: 'Syncing...' }
  },
  ja: {
    common: { yes: 'はい', no: 'いいえ', cancel: 'キャンセル', confirm: '確認', save: '保存' },
    pet: { name: 'キューティ', hungry: 'ちょっとお腹が空いてます...', happy: 'あなたと���緒に楽しい！' },
    chat: { title: 'キューティとチャット', placeholder: 'メッセージを入力...', send: '送信' },
    stats: { hunger: 'お腹', happiness: 'しあわせ', energy: 'エネルギー', health: '健康' },
    menu: { feed: 'ご飯', play: 'あそぶ', rest: 'ねむる', clean: 'あらう', shop: 'ショップ' },
    offline: { online: 'オンライン', offline: 'オフラインモード', syncing: '同期中...' }
  },
  ko: {
    common: { yes: '예', no: '아니오', cancel: '취소', confirm: '확인', save: '저장' },
    pet: { name: '귀요미', hungry: '조금 배고파요...', happy: '너와 함께 있으니 정말 재미있어!' },
    chat: { title: '귀요미와 채팅', placeholder: '메시지를 입력하세요...', send: '전송' },
    stats: { hunger: '배고픔', happiness: '행복', energy: '에너지', health: '건강' },
    menu: { feed: '밥', play: '놀기', rest: '자기', clean: '씻기', shop: '상점' },
    offline: { online: '온라인', offline: '오프라인 모드', syncing: '동기화 중...' }
  }
};

class i18nService {
  constructor() {
    this.currentLanguage = this.getDefaultLanguage();
  }

  getDefaultLanguage() {
    const saved = localStorage.getItem('language');
    if (saved) return saved;
    const browserLang = navigator.language.split('-')[0];
    return Object.keys(translations).includes(browserLang) ? browserLang : 'en';
  }

  setLanguage(lang) {
    if (Object.keys(translations).includes(lang)) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      return true;
    }
    return false;
  }

  t(key, defaultValue = key) {
    const keys = key.split('.');
    let value = translations[this.currentLanguage];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || defaultValue;
  }

  getAvailableLanguages() {
    return [
      { code: 'zh', name: '中文' },
      { code: 'en', name: 'English' },
      { code: 'ja', name: '日本語' },
      { code: 'ko', name: '한국어' }
    ];
  }
}

const i18n = new i18nService();
export default i18n;
