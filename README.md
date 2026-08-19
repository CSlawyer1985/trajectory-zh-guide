# 🈶 轨迹面板中文翻译 · 小白导读

<div align="center">

**让 DeepSeek Harness 的「轨迹面板」对非程序员同样友好 —— 全中文标签 + 逐条白话讲解 + 顶部导读**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/CSlawyer1985/trajectory-zh-guide)
[![Author](https://img.shields.io/badge/author-陈石(CS)-orange.svg)](https://github.com/CSlawyer1985)
[![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-已适配-4D6BFE)](https://github.com/deepseek-ai/deepseek-harness)

120+ 术语翻译 | 7 类轨迹逐条讲解 | 导读横幅 | 一键开关 | 纯本地 · 零依赖

[📖 项目简介](#-项目简介) • [🎯 为什么需要](#-为什么需要这个工具) • [📸 效果展示](#-效果展示) • [🚀 快速安装](#-快速安装) • [❓ 常见问题](#-常见问题)

</div>

---

## 📖 项目简介

**DeepSeek Harness** 是运行在你电脑上的 AI 工作台——它不只聊天，还能读文件、改代码、跑命令、上网搜索。它的**轨迹面板**记录 AI 干活的每一步（相当于 AI 的"工作监控录像"），但界面是给程序员设计的：满屏英文术语（`Tokens`、`TTFT`、`Tool Call`、`System Prompt`……），非程序员根本看不懂。

**本插件把轨迹面板翻译成人话**：所有英文标签变中文，每条轨迹下面加一句白话讲解，顶部再给一张"导读地图"。它不改 AI 的任何行为，只改界面显示——安装一条命令，卸载一条命令，随时可开关。

### 核心价值

💡 **文科生也能看懂** - 120+ 术语全中文，连 `Turn 2 → 第 2 轮`、`128 tok → 128 词元` 都翻译
🚀 **逐条白话讲解** - 每行轨迹自动配一句解释：它在读文件？跑命令？还是上网搜法条？
🧭 **顶部导读横幅** - 打开面板先看"阅读地图"，5 秒钟掌握整个面板怎么看
🔘 **一键开关** - 「文/A 翻译」按钮随时开/关，你的选择被记住，刷新不丢
🔒 **绝对安全** - 纯本地、不联网、不上传任何数据；只改一个界面文件且自动备份

---

## 🎯 为什么需要这个工具？

### 轨迹面板是什么？

AI 干活时，它背后的"工作日志"会记录每一个动作：

| 轨迹类型 | AI 在做什么 | 没翻译时你看到 | 翻译后你看到 |
|----------|-------------|----------------|--------------|
| 📋 系统提示词 | 开机时收到的工作说明书 | `System Prompt` | 「系统提示词」软件发给 AI 的工作说明书 |
| 🧑 用户 | 你发的消息 | `USER` | 「你的消息」这是你发给 AI 的话 |
| 🔧 工具调用 | 读文件 / 跑命令 / 搜网页 | `Tool Call · read` | 「工具调用」AI 正在使用 read 工具：读取文件内容 |
| 🧠 AI | AI 的思考和回复 | `Thinking` | 「AI 的回应」标着内心思考的是它的草稿 |
| 📦 记忆压缩 | 对话太长自动浓缩摘要 | `Compaction` | 「记忆压缩」前面的内容被浓缩，原文没有丢 |

> 没有它：看到 `TTFT 1.2s · 128 tok · Cache created`，一头雾水。
> 有了它：**「首字延迟 1.2 秒 · 128 词元 · 已建立缓存」**，一眼就懂 AI 干得快不快、省不省钱。

---

## 📸 效果展示

### 安装前：全英文，看不懂

![安装前：英文原版面板](screenshots/before.png)

### 安装后：全中文 + 逐条讲解 + 导读横幅

![安装后：中文翻译与白话讲解](screenshots/after.png)

### 开关按钮：随时切换中/英

![翻译开关](screenshots/toggle.png)

---

## ✨ 核心特性

- **120+ 术语中文翻译**：工具栏、行标签、详情面板全覆盖（Turns→按轮次、Duration→时长、Tokens→词元数、TTFT→首字延迟、Payload→提交的数据……）
- **7 类轨迹白话讲解**：系统 / 用户 / AI 回复 / 工具调用 / 子助手 / 背景信息 / 记忆压缩，每行自动加注
- **认识具体工具**：能认出 `read`、`bash`、`web_search`、`subagent` 等 30+ 常见工具并解释用途
- **动态跟随**：AI 运行中的状态变化（Pending→Completed）翻译实时跟进，不过期
- **开关记忆**：翻译状态存于浏览器本地，刷新/重启不丢失
- **自愈式稳定性**：面板重绘、切换会话都不会丢失讲解与开关；v3 起杜绝了早期版本可能出现的性能死循环问题

---

## 🚀 快速安装

> 需要先安装好 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)。全程只需一条命令。

**第 1 步**：下载本仓库的 `patch.js` 与 `apply.sh`，放到同一个文件夹（点绿色 `Code` → `Download ZIP` 即可）。

**第 2 步**：打开终端（Mac：`Command+空格` 搜"终端"；Windows：安装 [Git for Windows](https://git-scm.com/download/win) 后右键选 *Git Bash Here*）。

**第 3 步**：进入文件所在文件夹（输入 `cd ` 后把文件夹拖进终端窗口，回车）。

**第 4 步**：运行安装命令：

```bash
bash apply.sh
```

看到 `✅ 安装完成` 即成功（脚本自动找到面板文件、自动备份原件、幂等可重复运行）。

**第 5 步**：刷新 Harness 页面（`F5`），打开任意会话 → 点顶部「轨迹」标签页，即可看到效果。

---

## 🔧 卸载

```bash
cp /你的Harness路径/dsh-client-ui-trajectory/lib/client.js.bak client.js
```

安装时自动生成的 `client.js.bak` 就是原厂文件，复制回去覆盖即可。或直接点横幅上的「翻译：关」按钮，随时切回英文界面（不卸载也能用）。

---

## 🛡️ 安全说明

- ✅ **纯本地运行**：不联网、不上传任何数据、不收集任何信息
- ✅ **不改 AI 行为**：只翻译界面文字，AI 的工作过程一字不动
- ✅ **自动备份**：`client.js.bak` 一键还原
- ✅ **代码透明**：全部逻辑就是 `patch.js` 一个文件（约 500 行），任何人都可检查

---

## ❓ 常见问题

**Q：升级 Harness 后翻译失效了？**
A：正常，更新会覆盖补丁文件。重新下载本仓库的两个文件，再跑一次 `bash apply.sh` 即可。

**Q：关掉翻译会影响 AI 干活吗？**
A：完全不会，它只是界面显示。

**Q：翻译会不会过期？**
A：v3 起翻译实时跟随——React 更新过的文字（如状态从 Pending 变 Completed）会自动重新翻译。

**Q：分享给别人怎么用？**
A：把 `patch.js` + `apply.sh` 两个文件发过去，对方运行 `bash apply.sh` 即完成安装（无需登录、无需审批、无需 Harness 插件机制）。

---

## 👤 作者

**陈石（CS）** · [chenshi.ai](https://chenshi.ai) · 欢迎 Issue、欢迎转发

## 📄 许可证

[MIT License](LICENSE) —— 自由使用、修改、分享，注明出处即可。
