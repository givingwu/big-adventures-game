# 喵喵大冒险 🐱

一个基于 React 和 TypeScript 开发的可爱猫咪棋盘游戏。玩家通过掷骰子在棋盘上前进，收集奖励，享受冒险乐趣！

## ✨ 功能特点

- 🎲 互动式骰子系统
- 🎮 8x7 格子的精美游戏棋盘
- 🎁 特殊奖励格子系统
- 🌈 精美的动画效果
- 🎯 清晰的游戏进度显示
- 🔄 游戏重置功能

## 🛠️ 技术栈

- React 18
- TypeScript
- Tailwind CSS
- Vite

## 📦 安装和运行

1. 克隆项目
```bash
git clone https://github.com/gvingwu/big-adventures-game.git
cd big-adventures
```

2. 安装依赖
```bash
pnpm install
```

3. 启动开发服务器
```bash
pnpm run dev
```

4. 构建生产版本
```bash
pnpm run build
```

## 🎮 游戏规则

1. 游戏开始时，玩家的猫咪角色位于起点格子
2. 点击骰子或"摇骰子"按钮来掷骰子
3. 猫咪会根据骰子点数自动移动相应步数
4. 特殊格子类型：
   - 🟩 绿色：起点
   - 🟨 黄色：普通格子
   - 🟪 紫色：特殊奖励格子（可获得小鱼干、逗猫棒等奖励）
   - 🟥 红色：终点
5. 当猫咪到达终点时，游戏结束
6. 点击"重新开始"按钮可以开始新的游戏

## 🎯 游戏目标

帮助可爱的猫咪从起点出发，收集各种奖励，最终安全到达终点！

## 🖥️ 项目结构

```
src/
├── components/         # React 组件
│   ├── Game.tsx       # 主游戏组件
│   ├── GameBoard.tsx  # 游戏棋盘组件
│   ├── GameCell.tsx   # 棋盘格子组件
│   ├── GameDice.tsx   # 骰子组件
│   ├── GamePlayer.tsx # 玩家组件
│   └── RewardPopup.tsx# 奖励弹窗组件
├── hooks/             # 自定义 Hooks
│   └── game-state.hook.ts  # 游戏状态管理
├── services/          # 游戏服务
│   └── Game.service.ts# 游戏逻辑服务
└── App.tsx           # 应用入口
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 开源协议

MIT License - 详见 [LICENSE](LICENSE) 文件
