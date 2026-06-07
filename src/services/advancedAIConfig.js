/**
 * 高级 AI 模型配置
 * 支持更多 AI 服务和自定义模型
 */

const AI_MODELS = {
  // OpenAI
  'openai-gpt4': {
    provider: 'openai',
    id: 'gpt-4',
    name: 'GPT-4',
    description: '最强大的模型，推荐用于高质量回复',
    costPer1kTokens: 0.03,
    speed: 'slow',
    quality: 'excellent'
  },
  'openai-gpt35': {
    provider: 'openai',
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: '快速且经济的选择',
    costPer1kTokens: 0.002,
    speed: 'fast',
    quality: 'good'
  },

  // Anthropic Claude
  'claude-opus': {
    provider: 'claude',
    id: 'claude-3-opus-20240229',
    name: 'Claude 3 Opus',
    description: '最强大的 Claude 模型',
    costPer1kTokens: 0.015,
    speed: 'normal',
    quality: 'excellent'
  },
  'claude-sonnet': {
    provider: 'claude',
    id: 'claude-3-sonnet-20240229',
    name: 'Claude 3 Sonnet',
    description: '平衡的性能和成本',
    costPer1kTokens: 0.003,
    speed: 'fast',
    quality: 'good'
  },
  'claude-haiku': {
    provider: 'claude',
    id: 'claude-3-haiku-20240307',
    name: 'Claude 3 Haiku',
    description: '最快的 Claude 模型',
    costPer1kTokens: 0.00025,
    speed: 'veryfast',
    quality: 'decent'
  },

  // 豆包
  'doubao-pro': {
    provider: 'doubao',
    id: 'ep-xxx-pro',
    name: '豆包 Pro',
    description: '高端模型，支持长文本',
    costPer1kTokens: 0.001,
    speed: 'fast',
    quality: 'excellent'
  },
  'doubao-lite': {
    provider: 'doubao',
    id: 'ep-xxx-lite',
    name: '豆包 Lite',
    description: '轻量级模型，快速响应',
    costPer1kTokens: 0.0001,
    speed: 'veryfast',
    quality: 'good'
  },

  // 通义千问
  'qianwen-max': {
    provider: 'qianwen',
    id: 'qwen-max',
    name: '通义千问 Max',
    description: '最强大的通义模型',
    costPer1kTokens: 0.002,
    speed: 'normal',
    quality: 'excellent'
  },
  'qianwen-turbo': {
    provider: 'qianwen',
    id: 'qwen-turbo',
    name: '通义千问 Turbo',
    description: '高效率模型',
    costPer1kTokens: 0.0005,
    speed: 'fast',
    quality: 'good'
  },

  // Google Gemini
  'gemini-pro': {
    provider: 'gemini',
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: '谷歌最强模型',
    costPer1kTokens: 0,
    speed: 'fast',
    quality: 'excellent',
    free: true
  },
  'gemini-1-5-pro': {
    provider: 'gemini',
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    description: '最新版本，支持超长文本',
    costPer1kTokens: 0,
    speed: 'normal',
    quality: 'excellent',
    free: true
  },

  // 本地
  'local-default': {
    provider: 'local',
    id: 'local',
    name: '本地 AI',
    description: '无需网络，完全免费',
    costPer1kTokens: 0,
    speed: 'veryfast',
    quality: 'decent',
    free: true
  }
};

class AdvancedAIConfig {
  constructor() {
    this.selectedModel = 'local-default';
    this.models = AI_MODELS;
    this.customModels = [];
  }

  /**
   * 获取所有可用模型
   */
  getAllModels() {
    return {
      ...this.models,
      ...this.customModels.reduce((acc, model) => {
        acc[model.id] = model;
        return acc;
      }, {})
    };
  }

  /**
   * 按提供商获取模型
   */
  getModelsByProvider(provider) {
    return Object.entries(this.models)
      .filter(([_, model]) => model.provider === provider)
      .map(([key, model]) => ({ ...model, key }));
  }

  /**
   * 获取免费模型
   */
  getFreeModels() {
    return Object.entries(this.models)
      .filter(([_, model]) => model.free)
      .map(([key, model]) => ({ ...model, key }));
  }

  /**
   * 添加自定义模型
   */
  addCustomModel(modelConfig) {
    this.customModels.push({
      id: Date.now().toString(),
      ...modelConfig,
      custom: true
    });
  }

  /**
   * 获取模型信息
   */
  getModelInfo(modelKey) {
    return this.models[modelKey] || this.customModels.find(m => m.id === modelKey);
  }

  /**
   * 选择模型
   */
  selectModel(modelKey) {
    if (this.getAllModels()[modelKey]) {
      this.selectedModel = modelKey;
      return true;
    }
    return false;
  }

  /**
   * 获取选中的模型
   */
  getSelectedModel() {
    return this.getModelInfo(this.selectedModel);
  }
}

const advancedAIConfig = new AdvancedAIConfig();
export default advancedAIConfig;
export { AI_MODELS };
