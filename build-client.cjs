#!/usr/bin/env node
// 从 patch.js（IIFE 形态）生成 lib/client.js（静态 client 模块形态）
// DOM 机器在模块级运行，不依赖 Cordis fiber 生命周期（运行时释放 fiber 不杀死翻译）
// 用法: node build-client.cjs
const fs = require('fs');
const path = require('path');

let src = fs.readFileSync(path.join(__dirname, 'patch.js'), 'utf8');

// 1) 剥掉 IIFE 外壳
const start = src.indexOf(';(function () {');
const end = src.lastIndexOf('})();');
if (start === -1 || end === -1) throw new Error('patch.js 结构异常');
let body = src.slice(start + ';(function () {'.length, end);

// 2) 定时器提升为模块级变量
body = body.replace(
  '  var viewRoot = null;',
  '  var viewRoot = null;\n  var intervalId = null;'
);
if (body.indexOf('intervalId = window.setInterval') === -1) {
  body = body.replace(
    'window.setInterval(heartbeat, 2000);',
    'intervalId = window.setInterval(heartbeat, 2000);'
  );
}

// 3) 组装：patch 主体放工厂（模块级），apply 为空壳
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
\t\t\t// 占位：翻译机器在模块级运行，不随 fiber 生命周期启停
\t\t}
\t\t//#endregion
${body}
\t\texports.apply = apply;
\t\texports.inject = inject;
\t\treturn module.exports;
\t}
});
`;
fs.writeFileSync(path.join(__dirname, 'lib', 'client.js'), out);
console.log('lib/client.js generated:', fs.statSync(path.join(__dirname, 'lib', 'client.js')).size, 'bytes');
