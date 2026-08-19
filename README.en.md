# Trajectory Panel Chinese Translation & Plain-Language Guide

> Make the **Trajectory panel** of DeepSeek Harness readable for non-programmers:
> **every label translated to Chinese, every entry explained in plain language.**

[中文说明](README.md) · English

---

## What is this?

- **DeepSeek Harness** is a local AI workstation on your own computer. Beyond chatting, it can read your files, edit code, run commands, and search the web.
- **The Trajectory panel** is the "surveillance footage" of the AI at work: a chronological log of every step it took — which file it read, which command it ran, which page it searched, how much compute it used.

The panel is powerful but built for developers: `Tokens`, `TTFT`, `Tool Call`, `System Prompt`, `Compaction`… To a non-programmer it reads like a foreign language.

**This tool fixes exactly that.** It never changes what the AI does — it only translates the panel into human language: Chinese labels, a one-line plain explanation under every entry, and a guide banner on top that explains how to read the whole panel.

> In one sentence: it's the **user manual** the trajectory panel never had.

## Features

| Feature | What it does |
|---|---|
| 🈶 **All labels in Chinese** | `Turns`→按轮次, `Duration`→时长, `Tokens`→词元数, `TTFT`→首字延迟, `Turn 2`→第 2 轮… even units |
| 💡 **Plain-language notes per entry** | e.g. "Tool call: the AI is using the `read` tool to read a file" |
| 👋 **Guide banner** | A "reading map" at the top of the panel |
| 🔘 **Toggle button** | On/off any time; your choice is remembered across refreshes |
| 🔒 **Safe** | No network, no data upload, no behavior change; one UI file patched with an automatic backup |

## Install

Requirements: DeepSeek Harness installed, and a terminal (Terminal on macOS; Git Bash on Windows).

```bash
cd /path/to/this-folder
bash apply.sh
```

The script locates the trajectory module, backs it up, and applies the patch.
Then refresh the Harness page and open the **Trajectory** tab.

## Uninstall

Copy the auto-generated `client.js.bak` back over `client.js` in the
`dsh-client-ui-trajectory/lib/` folder.

## FAQ

- **Lost after upgrading Harness?** Re-run `bash apply.sh` — it re-installs automatically.
- **Does it affect the AI?** No. Display only.
- **Windows?** Yes, via Git Bash.

## Author

[chenshi.ai](https://chenshi.ai) — issues and feedback welcome.

## License

[MIT](LICENSE)
