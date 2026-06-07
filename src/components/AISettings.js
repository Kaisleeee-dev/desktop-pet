import React, { useState } from 'react';
import { AI_PROVIDERS } from '../services/aiService';
import aiService from '../services/aiService';
import usePetStore from '../store/petStore';
import './AISettings.css';

const AISettings = ({ onClose }) => {
  const aiConfig = usePetStore((state) => state.aiConfig);
  const setAIConfig = usePetStore((state) => state.setAIConfig);
  const [selectedProvider, setSelectedProvider] = useState(aiConfig.provider);
  const [apiKey, setApiKey] = useState(aiConfig.apiKey || '');
  const [customModel, setCustomModel] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');

    try {
      if (selectedProvider !== 'local' && apiKey) {
        // 验证 API 密钥
        const isValid = await aiService.validateApiKey(selectedProvider, apiKey);
        if (!isValid) {
          setMessage('❌ API 密钥验证失败');
          setIsSaving(false);
          return;
        }
      }

      // 初始化 AI 服务
      await aiService.initialize(selectedProvider, apiKey, {
        model: customModel
      });

      // 保存配置
      setAIConfig({
        provider: selectedProvider,
        apiKey: selectedProvider === 'local' ? null : apiKey,
        enabled: true
      });

      setMessage('✅ 设置保存成功！');
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error('Save error:', error);
      setMessage('❌ 保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="ai-settings">
      <div className="settings-header">
        <h3>AI 设置 🤖</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="settings-content">
        <div className="setting-group">
          <label>选择 AI 提供商</label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="provider-select"
          >
            <option value="local">本地 AI (无需密钥)</option>
            <option value="openai">OpenAI (GPT-3.5/4)</option>
            <option value="claude">Claude (Anthropic)</option>
            <option value="doubao">豆包 (Bytedance)</option>
            <option value="qianwen">通义千问 (Alibaba)</option>
            <option value="gemini">Google Gemini</option>
          </select>
        </div>

        {selectedProvider !== 'local' && (
          <>
            <div className="setting-group">
              <label>API 密钥</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="输入你的 API 密钥"
                className="api-input"
              />
              <small>🔒 你的密钥将被安全保存并仅用于与 AI 服务通信</small>
            </div>

            <div className="setting-group">
              <label>自定义模型 (可选)</label>
              <input
                type="text"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                placeholder="例如: gpt-4, claude-3-opus"
                className="model-input"
              />
            </div>
          </>
        )}

        {selectedProvider === 'local' && (
          <div className="info-box">
            <p>💡 <strong>本地 AI</strong></p>
            <p>使用内置的智能回复系统，无需任何 API 密钥。宠物会根据状态和你的消息进行回复。</p>
          </div>
        )}

        <div className="provider-info">
          {selectedProvider === 'openai' && (
            <p>📖 获取密钥: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">OpenAI Platform</a></p>
          )}
          {selectedProvider === 'claude' && (
            <p>📖 获取密钥: <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer">Anthropic Console</a></p>
          )}
          {selectedProvider === 'doubao' && (
            <p>📖 获取密钥: <a href="https://console.volcengine.com/ark/region:ark_cn_beijing/endpoint" target="_blank" rel="noopener noreferrer">Bytedance Console</a></p>
          )}
          {selectedProvider === 'qianwen' && (
            <p>📖 获取密钥: <a href="https://dashscope.console.aliyun.com/" target="_blank" rel="noopener noreferrer">Alibaba DashScope</a></p>
          )}
          {selectedProvider === 'gemini' && (
            <p>📖 获取密钥: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a></p>
          )}
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="settings-footer">
        <button className="btn-secondary" onClick={onClose}>取消</button>
        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={isSaving || (selectedProvider !== 'local' && !apiKey)}
        >
          {isSaving ? '保存中...' : '保存设置'}
        </button>
      </div>
    </div>
  );
};

export default AISettings;
