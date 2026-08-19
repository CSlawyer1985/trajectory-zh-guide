#!/usr/bin/env bash
# 轨迹面板「中文翻译 + 白话讲解」安装/升级脚本（幂等，可重复运行）
# 用法: bash apply.sh [模块文件路径]
set -euo pipefail

PATCH_FILE="$(dirname "$0")/patch.js"
REGION_START='//#region tg-patch'
REGION_END='//#endregion tg-patch'
MARKER='tg-guide-enabled'

find_module() {
  local f
  for f in \
    "$HOME/.npm/_npx/"*/node_modules/@deepseek-ai/dsh-client-ui-trajectory/lib/client.js \
    "$HOME/.npm/_npx/"*/node_modules/@deepseek-ai/dsh-client-ui-trajectory/lib/client.cjs \
    "$HOME/Library/Caches/pnpm/"*/node_modules/@deepseek-ai/dsh-client-ui-trajectory/lib/client.js; do
    if [ -f "$f" ]; then echo "$f"; return 0; fi
  done
  return 1
}

TARGET="${1:-}"
if [ -z "$TARGET" ]; then TARGET="$(find_module || true)"; fi
if [ -z "$TARGET" ] || [ ! -f "$TARGET" ]; then
  echo "❌ 找不到 dsh-client-ui-trajectory 模块文件，请把路径作为参数传入：bash apply.sh /path/to/client.js" >&2
  exit 1
fi
echo "目标文件: $TARGET"

# 升级旧补丁（v2 无区域标记）：先用备份还原成原厂文件，再装新版
if ! grep -qF "$REGION_START" "$TARGET" && grep -qF "$MARKER" "$TARGET"; then
  if [ -f "$TARGET.bak" ] && ! grep -qF "$MARKER" "$TARGET.bak"; then
    echo "⚠️  检测到旧版补丁，先从备份还原原厂文件再安装新版…"
    cp "$TARGET.bak" "$TARGET"
  else
    echo "❌ 检测到旧版补丁但没有可用备份，请先手动恢复：从 Harness 安装包重新拷贝该文件" >&2
    exit 1
  fi
fi

# 备份只在第一次安装时创建，绝不用补丁后的内容覆盖真备份
if [ ! -f "$TARGET.bak" ]; then cp "$TARGET" "$TARGET.bak"; fi

node -e "
const fs = require('fs');
const path = process.argv[1];
const patch = fs.readFileSync(process.argv[2], 'utf8');
let src = fs.readFileSync(path, 'utf8');
const start = src.indexOf('//#region tg-patch');
const end = src.indexOf('//#endregion tg-patch');
const wrapped = '//#region tg-patch\n' + patch + '\n//#endregion tg-patch';
if (start !== -1 && end !== -1 && end > start) {
  src = src.slice(0, start) + wrapped + src.slice(end + '//#endregion tg-patch'.length);
} else {
  const marker = '//# sourceMappingURL=client.js.map';
  if (!src.includes(marker)) { console.error('❌ 未找到 sourceMappingURL 标记，文件结构异常'); process.exit(1); }
  src = src.replace(marker, wrapped + '\n' + marker);
}
fs.writeFileSync(path, src);
" "$TARGET" "$PATCH_FILE"

echo "✅ 安装完成（原厂文件已备份为 $TARGET.bak）"
echo "   刷新浏览器后生效；开关状态保存在浏览器 localStorage（tg-guide-enabled）"
