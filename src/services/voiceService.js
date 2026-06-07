/**
 * 语音交互服务
 */

class VoiceService {
  constructor() {
    this.isListening = false;
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.initializeSpeechRecognition();
  }

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

  startListening(onResult, onError) {
    if (!this.recognition) {
      console.error('Speech Recognition not initialized');
      return;
    }
    this.isListening = true;

    this.recognition.onresult = (event) => {
      let transcript = '';
      let isFinal = false;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        isFinal = event.results[i].isFinal;
      }
      onResult({ transcript, isFinal });
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      onError(event.error);
    };

    this.recognition.start();
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text, options = {}) {
    if (!this.synthesis) return;
    this.synthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'zh-CN';
    utterance.rate = options.rate || 1;
    this.synthesis.speak(utterance);
  }

  static isSupported() {
    return (window.SpeechRecognition || window.webkitSpeechRecognition) && window.speechSynthesis;
  }
}

const voiceService = new VoiceService();
export default voiceService;
