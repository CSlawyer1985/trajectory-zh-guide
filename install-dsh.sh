#!/usr/bin/env bash
# 把轨迹面板中文翻译安装为「静态 client 模块」（升级主程序不丢失）
# 用法: bash install-dsh.sh [profile目录，默认 ~/.dsh/profiles/web]
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
PKG_NAME="trajectory-zh-guide"
PROFILE="${1:-$HOME/.dsh/profiles/web}"

if [ ! -f "$PROFILE/cordis.patch.yml" ]; then
  echo "❌ 未找到 $PROFILE/cordis.patch.yml，请确认 profile 路径" >&2
  exit 1
fi
echo "目标 profile: $PROFILE"

# 0) 自动探测「DSH 主 node_modules」：优先取正在运行的 dsh 进程所用的安装目录
MAIN_NM=""
RUNNING_BIN="$(ps aux | grep -oE '/[^ ]*node_modules/@deepseek-ai/dsh/lib/bin\.js' | head -1 || true)"
if [ -n "$RUNNING_BIN" ]; then
  MAIN_NM="$(dirname "$(dirname "$(dirname "$(dirname "$RUNNING_BIN")")")")"  # .../node_modules
  [ -d "$MAIN_NM" ] || MAIN_NM=""
fi
if [ -z "$MAIN_NM" ]; then
  for d in "$HOME"/.npm/_npx/*/node_modules "$HOME"/.dsh/.npm-cache/_npx/*/node_modules; do
    if [ -d "$d/@deepseek-ai/dsh" ]; then MAIN_NM="$d"; break; fi
  done
fi
if [ -z "$MAIN_NM" ]; then
  echo "⚠️ 未探测到 DSH 主安装目录；跳过主 node_modules 安装（可手动复制 lib/ 和 package.json 过去）"
else
  echo "DSH 主 node_modules: $MAIN_NM"
  # 1a) 安装到主 node_modules（运行进程的裸 import 解析点）
  PKG_DIR="$MAIN_NM/$PKG_NAME"
  rm -rf "$PKG_DIR"; mkdir -p "$PKG_DIR"
  cp -R "$REPO_DIR/lib" "$REPO_DIR/package.json" "$PKG_DIR/"
  echo "✅ 包体已安装到主 node_modules: $PKG_DIR"
fi

# 1b) 同时安装到 profile 的 node_modules（loader 以 profile 为 base 解析的备选路径）
PKG_DIR2="$PROFILE/node_modules/$PKG_NAME"
rm -rf "$PKG_DIR2"; mkdir -p "$PKG_DIR2"
cp -R "$REPO_DIR/lib" "$REPO_DIR/package.json" "$PKG_DIR2/"
echo "✅ 包体已安装到 profile node_modules: $PKG_DIR2"

# 清理 pnpm 虚拟存储中可能残留的旧快照（防止服务器解析到过期副本）
rm -rf "$PROFILE/node_modules/.pnpm/$PKG_NAME@"* 2>/dev/null || true

# 2) 在 cordis.patch.yml 注册插件行（幂等）
PATCH="$PROFILE/cordis.patch.yml"
if grep -q "id: $PKG_NAME" "$PATCH"; then
  echo "✅ cordis.patch.yml 已注册（跳过）"
else
  cp "$PATCH" "$PATCH.bak"
  if grep -q '^\[\]$' "$PATCH"; then
    awk -v insert="$(printf '%s\n' '' '- # trajectory-zh-guide: 轨迹面板中文翻译+白话讲解（静态 client 模块）' '- insert:' '    - id: trajectory-zh-guide' '      name: trajectory-zh-guide')" \
      'BEGIN{replaced=0} /^\[\]$/ && !replaced { print insert; replaced=1; next } { print }' \
      "$PATCH" > "$PATCH.tmp" && mv "$PATCH.tmp" "$PATCH"
  else
    cat >> "$PATCH" <<'EOF'

# trajectory-zh-guide: 轨迹面板中文翻译+白话讲解（静态 client 模块）
- insert:
    - id: trajectory-zh-guide
      name: trajectory-zh-guide
EOF
  fi
  echo "✅ 已注册插件行（原文件备份为 cordis.patch.yml.bak）"
fi

# 3) 记录到 profile package.json 依赖（供未来 pnpm install 恢复；无 node 时跳过）
NODE_BIN="$(command -v node || echo /opt/homebrew/bin/node)"
if [ -x "$NODE_BIN" ]; then
  "$NODE_BIN" -e "
const fs = require('fs');
const p = process.argv[1];
const pkg = JSON.parse(fs.readFileSync(p, 'utf8'));
pkg.dependencies = pkg.dependencies || {};
if (!pkg.dependencies['$PKG_NAME']) {
  pkg.dependencies['$PKG_NAME'] = 'file:$REPO_DIR';
  fs.writeFileSync(p, JSON.stringify(pkg, null, 2) + '\n');
  console.log('✅ 已写入 package.json 依赖');
} else {
  console.log('✅ package.json 依赖已存在');
}
" "$PROFILE/package.json" || echo "⚠️ package.json 更新失败（可手动添加）"
else
  echo "⚠️ 未找到 node，跳过 package.json 依赖登记"
fi

echo ""
echo "✅ 安装完成！请重启 Harness 使新组合生效："
echo "   nohup bash ~/.dsh/restart-web.sh >/tmp/dsh-restart.log 2>&1 &"
echo "   重启后刷新浏览器，打开「轨迹」面板即可看到效果。"
