/**
 * 国际化（i18n）配置
 * 支持多语言
 */

const translations = {
  zh: {
    common: {
      yes: '是',
      no: '否',
      cancel: '取消',
      confirm: '确认',
      save: '保存',
      settings: '设置',
      logout: '登出'
    },
    pet: {
      name: '小萌',
      hungry: '我肚子有点饿呢...',
      happy: '和你在一起真开心！',
      tired: '我好困啊...',
      sad: '你能陪陪我吗...'
    },
    chat: {
      title: '与小萌聊天',
      placeholder: '输入消息...',
      send: '发送',
      loading: '输入中...'
    },
    stats: {
      hunger: '饥饿度',
      happiness: '快乐度',
      energy: '能量值',
      health: '健康度'
    },
    menu: {
      feed: '喂食',
      play: '玩耍',
      rest: '休息',
      clean: '洗澡',
      shop: '商店',
      leaderboard: '排行榜',
      settings: '设置'
    },
    ai: {
      title: 'AI 设置',
      provider: '选择 AI 提供商',
      apiKey: 'API 密钥',
      validate: '验证',
      success: '设置保存成功！',
      error: 'API 密钥验证失败'
    },
    offline: {
      online: '在线',
      offline: '离线模式',
      syncing: '正在同步...',
      syncFailed: '同步失败',
      syncSuccess: '同步成功'
    },
    social: {
      friends: '好友',
      leaderboard: '排行榜',
      rank: '排名',
      level: '等级',
      experience: '经验'
    }
  },
  en: {
    common: {
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      settings: 'Settings',
      logout: 'Logout'
    },
    pet: {
      name: 'Cutie',
      hungry: 'I\'m a bit hungry...',
      happy: 'It\'s so fun to be with you!',
      tired: 'I\'m so sleepy...',
      sad: 'Can you keep me company?'
    },
    chat: {
      title: 'Chat with Cutie',
      placeholder: 'Type a message...',
      send: 'Send',
      loading: 'Typing...'
    },
    stats: {
      hunger: 'Hunger',
      happiness: 'Happiness',
      energy: 'Energy',
      health: 'Health'
    },
    menu: {
      feed: 'Feed',
      play: 'Play',
      rest: 'Rest',
      clean: 'Clean',
      shop: 'Shop',
      leaderboard: 'Leaderboard',
      settings: 'Settings'
    },
    ai: {
      title: 'AI Settings',
      provider: 'Choose AI Provider',
      apiKey: 'API Key',
      validate: 'Validate',
      success: 'Settings saved successfully!',
      error: 'API key validation failed'
    },
    offline: {
      online: 'Online',
      offline: 'Offline Mode',
      syncing: 'Syncing...',
      syncFailed: 'Sync failed',
      syncSuccess: 'Sync successful'
    },
    social: {
      friends: 'Friends',
      leaderboard: 'Leaderboard',
      rank: 'Rank',
      level: 'Level',
      experience: 'Experience'
    }
  },
  ja: {
    common: {
      yes: 'はい',
      no: 'いいえ',
      cancel: 'キャンセル',
      confirm: '確認',
      save: '保存',
      settings: '設定',
      logout: 'ログアウト'
    },
    pet: {
      name: 'キューティ',
      hungry: 'ちょっとお腹が空いてます...',
      happy: 'あなたと一緒にいると楽しい！',
      tired: 'すごく眠いです...',
      sad: '一緒にいてくれませんか?'
    },
    chat: {
      title: 'キューティとチャット',
      placeholder: 'メッセージを入力...',
      send: '送信',
      loading: '入力中...'
    },
    stats: {
      hunger: 'おなか',
      happiness: 'しあわせ',
      energy: 'エネルギー',
      health: 'けんこう'
    },
    menu: {
      feed: 'ごはん',
      play: 'あそぶ',
      rest: 'ねむる',
      clean: 'あらう',
      shop: 'ショップ',
      leaderboard: 'ランキング',
      settings: '設定'
    },
    ai: {
      title: 'AI設定',
      provider: 'AIプロバイダーを選択',
      apiKey: 'APIキー',
      validate: '検証',
      success: '設定が保存されました！',
      error: 'APIキーの検証に失敗しました'
    },
    offline: {
      online: 'オンライン',
      offline: 'オフラインモード',
      syncing: '同期中...',
      syncFailed: '同期失敗',
      syncSuccess: '同期成功'
    },
    social: {
      friends: 'フレンド',
      leaderboard: 'ランキング',
      rank: '順位',
      level: 'レベル',
      experience: '経験値'
    }
  },
  ko: {
    common: {
      yes: '예',
      no: '아니오',
      cancel: '취소',
      confirm: '확인',
      save: '저장',
      settings: '설정',
      logout: '로그아웃'
    },
    pet: {
      name: '귀요미',
      hungry: '좀 배고픈데요...',
      happy: '너와 함께 있으니 정말 재미있어!',
      tired: '너무 졸려요...',
      sad: '나랑 있어줄래?'
    },
    chat: {
      title: '귀요미와 채팅',
      placeholder: '메시지를 입력하세요...',
      send: '전송',
      loading: '입력 중...'
    },
    stats: {
      hunger: '배고픔',
      happiness: '행복',
      energy: '에너지',
      health: '건강'
    },
    menu: {
      feed: '밥',
      play: '놀기',
      rest: '쉬기',
      clean: '씻기',
      shop: '상점',
      leaderboard: '순위표',
      settings: '설정'
    },
    ai: {
      title: 'AI 설정',
      provider: 'AI 제공자 선택',
      apiKey: 'API 키',
      validate: '검증',
      success: '설정이 저장되었습니다!',
      error: 'API 키 검증에 실패했습니다'
    },
    offline: {
      online: '온라인',
      offline: '오프라인 모드',
      syncing: '동기화 중...',
      syncFailed: '동기화 실패',
      syncSuccess: '동기화 성공'
    },
    social: {
      friends: '친구',
      leaderboard: '순위표',
      rank: '순위',
      level: '레벨',
      experience: '경험치'
    }
  }
};

class i18nService {
  constructor() {
    this.currentLanguage = this.getDefaultLanguage();
  }

  /**
   * 获取默认语言
   */
  getDefaultLanguage() {
    const saved = localStorage.getItem('language');
    if (saved) return saved;

    const browserLang = navigator.language.split('-')[0];
    return Object.keys(translations).includes(browserLang) ? browserLang : 'en';
  }

  /**
   * 设置语言
   */
  setLanguage(lang) {
    if (Object.keys(translations).includes(lang)) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      return true;
    }
    return false;
  }

  /**
   * 获取翻译文本
   */
  t(key, defaultValue = key) {
    const keys = key.split('.');
    let value = translations[this.currentLanguage];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || defaultValue;
  }

  /**
   * 获取所有支持的语言
   */
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
export { translations };
