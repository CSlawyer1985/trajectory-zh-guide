#!/usr/bin/env node
// 从 patch.js（IIFE 形态）生成 lib/client.js（静态 client 模块形态）
// 用法: node build-client.js
const fs = require('fs');
const path = require('path');

let src = fs.readFileSync(path.join(__dirname, 'patch.js'), 'utf8');

// 1) 剥掉 IIFE 外壳
const start = src.indexOf(';(function () {');
const end = src.lastIndexOf('})();');
if (start === -1 || end === -1) throw new Error('patch.js 结构异常');
let body = src.slice(start + ';(function () {'.length, end);

// 2) 把观察器/定时器提升为 apply 作用域变量，供卸载清理
body = body.replace(
  '  var viewRoot = null;',
  '  var viewRoot = null;\n  var bodyObserver = null;\n  var intervalId = null;'
);
body = body.replace(
  'var bodyObserver = new MutationObserver(function () { syncView(); });',
  'bodyObserver = new MutationObserver(function () { syncView(); });'
);
body = body.replace(
  'window.setInterval(heartbeat, 2000);',
  'intervalId = window.setInterval(heartbeat, 2000);'
);

// 3) 组装为静态 client 模块（ModuleLoader 契约 + Cordis apply）
const out = `window.__ModuleLoader__.load({
\tid: "trajectory-zh-guide",
\tfactory: (require) => {
\t\tvar module = { exports: {} };
\t\tvar exports = module.exports;
\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
\t\t//#region trajectory-zh-guide client plugin
\t\t/** Required services: none — DOM-based, works standalone. */
\t\tconst inject = [];
\t\tfunction apply(ctx) {
${body}
\t\t\tctx.effect(function () {
\t\t\t\ttry {
\t\t\t\t\tif (bodyObserver) bodyObserver.disconnect();
\t\t\t\t\tif (intervalId !== null) window.clearInterval(intervalId);
\t\t\t\t\tdetach();
\t\t\t\t\trestore();
\t\t\t\t} catch (e) { /* noop */ }
\t\t\t}, 'trajectory-zh-guide: cleanup');
\t\t}
\t\t//#endregion
\t\texports.apply = apply;
\t\texports.inject = inject;
\t\treturn module.exports;
\t}
});
`;
fs.writeFileSync(path.join(__dirname, 'lib', 'client.js'), out);
console.log('lib/client.js generated:', fs.statSync(path.join(__dirname, 'lib', 'client.js')).size, 'bytes');
