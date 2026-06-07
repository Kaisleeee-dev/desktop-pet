# 🌐 Desktop Pet - 跨平台支持

## 平台支持

该项目支持以下平台的完整同步和体验：

### 🖥️ **Windows / macOS / Linux (Desktop)**
- Electron 应用
- 实时窗口宠物
- 完整的 AI 集成
- 本地存储支持

### 📱 **Android**
- 原生 React Native 应用
- Google Play 应用市场分发
- 通知推送支持
- 云同步功能

### 🍎 **iOS**
- 原生 React Native 应用
- Apple App Store 分发
- 通知推送支持
- 云同步功能

### 🌐 **Web**
- React Web 应用
- PWA 支持（离线访问）
- 响应式设计
- 云同步功能

## 🚀 快速开始

### 1. 桌面应用（Electron）

```bash
# 安装依赖
npm install

# 开发模式
npm start

# 构建应用
npm run build
```

### 2. 移动应用（React Native + Expo）

#### Android
```bash
# 安装 Expo CLI
npm install -g expo-cli

# 启动开发服务器
npm run android

# 或者扫描二维码使用 Expo Go 应用
npm run native
```

#### iOS（需要 macOS）
```bash
npm run ios
```

### 3. Web 应用

```bash
npm run web
```

## ☁️ 云同步架构

### 数据同步流程

```
┌─────────────────────────────────────────┐
│     用户登录 / 注册                      │
│  (cloudSync.login / cloudSync.register)  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    初始化云同步                         │
│  (cloudSync.connectRealTimeSync)        │
└──────────────┬──────────────────────────┘
               │
               ▼
      ┌────────────────┐
      │   设备 1       │
      │  (Desktop)     │
      └────────┬───────┘
               │
         ┌─────┴──────────┐
         │                │
         ▼                ▼
    ┌─────────┐      ┌─────────┐
    │   iOS   │      │ Android │
    │  应用   │      │  应用   │
    └────┬────┘      └────┬────┘
         │                │
         └────────┬───────┘
                  ▼
        ┌──────────────────┐
        │   云服务器       │
        │  (Firebase/自建) │
        └──────────────────┘
```

### 宠物状态同步

每个设备会自动同步以下数据：
- 🍖 **饥饿度** - 所有设备实时同步
- 😊 **快乐度** - 基于最新交互
- ⚡ **能量值** - 跨设备累计
- ❤️ **健康度** - 实时更新
- 💭 **聊天记录** - 云端保存
- 🎮 **成就/等级** - 全平台同步

## 🔐 安全性

### 认证
- JWT 令牌认证
- 设备绑定
- 自动令牌刷新

### 数据加密
- HTTPS/WSS 安全连接
- 敏感数据端到端加密
- API 密钥安全存储

### 隐私保护
- 不收集个人敏感信息
- 支持数据导出
- 支持账户删除

## 🤖 AI 集成

### 支持的 AI 服务

| 提供商 | 模型 | 成本 | 速度 | 质量 |
|--------|------|------|------|------|
| 本地 AI | 内置 | 免费 | 最快 | 中等 |
| OpenAI | GPT-4 | 💰💰 | 快 | 最好 |
| Claude | Claude 3 | 💰 | 中等 | 很好 |
| 豆包 | Doubao | 💰 | 很快 | 好 |
| 通义千问 | Qwen | 💰 | 很快 | 好 |
| Gemini | Gemini Pro | 免费 | 中等 | 很好 |

### 配置 AI

1. 点击右上角设置按钮
2. 选择 AI 提供商
3. 输入 API 密钥
4. 点击保存

## 📲 应用商店

### Google Play Store
```
搜索: "Desktop Pet"
https://play.google.com/store/apps/details?id=com.desktoppet.app
```

### Apple App Store
```
搜索: "Desktop Pet"
https://apps.apple.com/app/desktop-pet/
```

## 🗂️ 项目结构

```
desktop-pet/
├── src/
│   ├── components/          # React 组件（跨平台）
│   ├── services/           # 业务逻辑
│   │   ├── aiService.js    # AI 集成
│   │   ├── cloudSync.js    # 云同步
│   │   └── platformDetect.js # 平台检测
│   ├── store/              # 状态管理 (Zustand)
│   ├── App.js              # 主应用入口
│   └── index.js            # React 入口
├── public/
│   ├── electron.js         # Electron 主进程
│   └── preload.js          # Electron 预加载
├── app.json                # Expo 配置
├── package.json            # 项目依赖
└── README.md               # 项目文档
```

## 🔧 环境变量

创建 `.env.local` 文件：

```env
# 云服务配置
REACT_APP_CLOUD_API=https://your-api.com
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_PROJECT_ID=your_project

# AI 服务（可选）
REACT_APP_DEFAULT_AI_PROVIDER=local
```

## 🐛 故障排除

### 云同步不工作
1. 检查网络连接
2. 确认已登录账户
3. 查看浏览器控制台错误
4. 尝试刷新页面

### AI 回复错误
1. 检查 API 密钥是否正确
2. 确认 API 配额充足
3. 查看网络请求日志
4. 切换到本地 AI 模式

### 跨设备同步延迟
1. 检查网络延迟
2. 确保所有设备已登录
3. 手动刷新同步（下拉刷新）

## 📱 移动应用特性

### Android
- 后台同步
- 推送通知
- 桌面小部件
- 快捷方式

### iOS
- 后台刷新
- 推送通知
- Siri 快捷方式
- 锁屏小部件

## 🌟 开发计划

- [ ] 离线模式完善
- [ ] 本地数据库集成
- [ ] 更多 AI 模型支持
- [ ] 多语言支持
- [ ] 宠物皮肤商店
- [ ] 社交功能（养成排行榜）
- [ ] VR/AR 支持
- [ ] 语音交互

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**🎉 祝您和跨平台的宠物相处愉快！**
