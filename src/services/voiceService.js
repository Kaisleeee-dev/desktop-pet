/**
 * 语音交互服务
 * 支持语音识别和语音合成
 */

class VoiceService {
  constructor() {
    this.isListening = false;
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.initializeSpeechRecognition();
  }

  /**
   * 初始化语音识别
   */
  initializeSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'zh-CN';
  }

  /**
   * 开始监听
   */
  startListening(onResult, onError) {
    if (!this.recognition) {
      console.error('Speech Recognition not initialized');
      return;
    }

    this.isListening = true;

    this.recognition.onstart = () => {
      console.log('🎤 开始监听...');
    };

    this.recognition.onresult = (event) => {
      let transcript = '';
      let isFinal = false;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        isFinal = event.results[i].isFinal;
      }

      onResult({
        transcript,
        isFinal,
        confidence: event.results[event.results.length - 1][0].confidence
      });
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      console.log('🎤 监听结束');
    };

    this.recognition.start();
  }

  /**
   * 停止监听
   */
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * 语音合成
   */
  speak(text, options = {}) {
    if (!this.synthesis) {
      console.error('Speech Synthesis not supported');
      return;
    }

    // 取消之前的语音
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'zh-CN';
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    utterance.onstart = () => {
      console.log('🔊 开始播放...');
      options.onStart?.();
    };

    utterance.onend = () => {
      console.log('🔊 播放完成');
      options.onEnd?.();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      options.onError?.(event.error);
    };

    this.synthesis.speak(utterance);
  }

  /**
   * 获取可用的语言
   */
  getAvailableVoices() {
    return this.synthesis.getVoices();
  }

  /**
   * 检查浏览器支持
   */
  static isSupported() {
    return (
      (window.SpeechRecognition || window.webkitSpeechRecognition) &&
      window.speechSynthesis
    );
  }
}

const voiceService = new VoiceService();
export default voiceService;
