window.__ModuleLoader__.load({
	id: "trajectory-zh-guide",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region trajectory-zh-guide client plugin
		/** Required services: none — DOM-based, works standalone. */
		const inject = [];
		function apply(ctx) {

  'use strict';
  // 双重启动保护：模块被重复求值（HMR/重复加载）时只跑一套补丁
  if (window.__tgPatchBooted) return;
  window.__tgPatchBooted = true;

  var DICT = {
    'SYSTEM': '系统', 'USER': '用户', 'CONTEXT': '背景', 'COMPACTED': '已压缩',
    'ASSISTANT': 'AI', 'TOOL': '工具', 'SUBTOOL': '子任务',
    'Trajectory': '轨迹', 'Trajectory toolbar': '轨迹工具栏', 'Trajectory timeline': '轨迹时间轴',
    'Loading trajectory…': '正在加载轨迹…',
    'Duration': '时长', 'Actual time': '实际时间', 'Turns': '按轮次', 'Calls': '按调用',
    'Expand turns': '展开所有轮次', 'Collapse turns': '收起所有轮次',
    'Expand calls': '展开所有调用', 'Collapse calls': '收起所有调用',
    'Use actual duration': '按真实时长排列', 'Use equal-width operations': '等宽排列',
    'Search trajectory': '搜索轨迹', 'Search': '搜索',
    'Between turns': '两轮之间',
    'Load earlier history': '加载更早的记录',
    'Click to load earlier history': '点击加载更早的记录',
    'Loading earlier history…': '正在加载更早的记录…',
    'Thinking': '内心思考', 'Reasoning': '推理', 'Generation': '生成',
    'Tool Call': '工具调用', 'Tool calls': '工具调用', 'Subtool calls': '子助手调用',
    'Tool': '工具', 'Tools': '工具', 'Tools Updated': '工具列表已更新',
    'System Prompt': '系统提示词', 'Initial System Prompt': '初始系统提示词',
    'System Prompt Updated': '系统提示词已更新',
    'System Prompt and Tools Updated': '系统提示词与工具已更新',
    'Compaction': '记忆压缩', 'Compacted': '已压缩', 'Compaction failed': '记忆压缩失败',
    'Context compacted': '上下文已压缩',
    'Compaction was interrupted before completion.': '记忆压缩在完成前被中断。',
    'Input': '输入', 'Output': '输出', 'Tokens': '词元数', 'Usage': '用量',
    'Cached': '命中缓存', 'Cache created': '已建立缓存',
    'TTFT': '首字延迟 (TTFT)', 'Throughput': '生成速度', 'Timing': '计时', 'Timing source': '计时来源',
    'Total duration': '总耗时', 'Request Timing': '请求耗时明细', 'This request': '本次请求',
    'Session cumulative': '本次会话累计', 'Session timestamps': '会话时间',
    'Session timestamps (running)': '会话时间（进行中）',
    'Show local time': '显示本地时间', 'Show Unix timestamp': '显示 Unix 时间戳',
    'Model': '模型', 'Provider': '服务商', 'Status': '状态', 'Started': '开始时间',
    'Completed': '已完成', 'Failed': '失败', 'Interrupted': '被中断', 'Pending': '排队中',
    'Retry': '重试', 'Retry delay': '重试等待', 'Error': '错误',
    'Parameters': '参数', 'Payload': '提交的数据', 'Result': '结果', 'Result JSON': '结果数据 (JSON)',
    'Raw': '原始', 'Raw Output': '原始输出', 'Preview': '预览', 'Summary': '摘要',
    'Content': '内容', 'Message': '消息', 'Assistant Message': 'AI 的消息', 'User': '用户',
    'Schema': '数据结构', 'Options': '选项', 'Source': '来源', 'Purpose': '用途',
    'Goal': '目标', 'Plugin': '插件', 'Module': '模块', 'Hierarchy': '层级结构',
    'Diff': '改动对比', 'Event': '事件', 'Other': '其他', 'Unknown': '未知',
    'Scheduled': '已排队', 'Collapse': '收起', 'Expand': '展开',
    'Message source JSON': '消息源数据 (JSON)', 'Request options JSON': '请求选项 (JSON)',
    'Open image': '打开图片', 'Open tool call summary': '打开工具调用摘要',
    'Close details': '关闭详情', 'Event details': '事件详情', 'Resize event details': '调整事件详情宽度',
    'Drag to resize. Double-click to reset.': '拖动调整宽度，双击复原',
    'No content': '无内容', 'No output': '无输出',
    'No payload captured': '未捕获数据内容', 'No result captured': '未捕获结果',
    'No timing data': '无计时数据', 'Not available': '不可用', 'Not recorded': '未记录',
    'Duration too short': '耗时过短', 'First token unavailable': '首字时间未知',
    'Output tokens unavailable': '输出词元数未知', 'Usage not reported': '未报告用量',
    'Usage unavailable': '用量未知', 'Schema unavailable': '数据结构不可用',
    'Source not recorded': '来源未记录', 'Options not recorded': '选项未记录',
    'No tools in this request': '本次请求未携带工具',
    'No system prompt in this request': '本次请求未携带系统提示词',
    'Step start unavailable': '步骤开始时间未知', 'Tool call only': '仅工具调用'
  };
  var RULES = [
    [/^Turn (\d+)$/, function (m) { return '第 ' + m[1] + ' 轮'; }],
    [/^Step (\d+)$/, function (m) { return '第 ' + m[1] + ' 步'; }],
    [/^Request (\d+)$/, function (m) { return '第 ' + m[1] + ' 次请求'; }],
    [/^([\d,]+(?:\.\d+)?) tok$/, function (m) { return m[1] + ' 词元'; }]
  ];
  var KIND_NOTES = {
    system: '「系统提示词」软件发给 AI 的“工作说明书”：告诉它是谁、能用哪些工具、要守什么规矩。自动生成，你随便看看就好。',
    user: '「你的消息」这是你发给 AI 的话，每一轮对话从这里开始。',
    context: '「背景信息」软件自动补充给 AI 的环境资料（当前时间、工作目录等），帮它了解处境。',
    message: '「AI 的回应」AI 想清楚之后说出的话。标着“内心思考”的是它的草稿，正式答案看最后。',
    tool: '「工具调用」AI 在动手做事：读文件、改代码、跑命令、搜网页……点开这一行能看到它具体做了什么、结果如何。',
    subtool: '「子助手在干活」AI 派生了一个“分身”去并行处理子任务，这是分身调用工具的记录。',
    compacted: '「记忆压缩」对话太长了，软件把前面的内容浓缩成摘要，给 AI 腾出“记忆空间”。原文没有丢，只是折叠了。'
  };
  var TOOL_NAMES = {
    read: '读取文件内容', write: '创建或重写一个文件', edit: '精确修改文件里的一段文字',
    bash: '在终端里运行命令', grep: '在文件里搜索关键词', glob: '按文件名模式查找文件',
    web_search: '上网搜索资料', web_fetch: '读取一个网页的内容',
    skill: '加载一个“技能包”（专项工作指南）', todo_write: '更新任务清单',
    ask_user_question: '向你提问、等你选择',
    subagent: '派生一个子助手去做独立任务', subagent_fork: '派生一个子助手接着当前话题干活',
    cordis_define: '给这个软件定义一个新插件', cordis_run: '运行一个插件',
    cordis_stop: '停用一个插件', cordis_undefine: '删除一个插件',
    cordis_inspect_list: '查看软件有哪些可扩展能力', cordis_inspect_query: '查询某个能力的具体用法',
    cordis_inspect_self: '查看插件自己的状态',
    create_goal: '设立一个长期目标', update_goal: '更新长期目标', get_goal: '查看长期目标',
    workflow: '编排一批子助手并行干活', job_list: '查看后台任务', job_output: '读取后台任务输出',
    job_kill: '终止后台任务', interrupt_agent: '打断一个子助手', send_message: '给子助手发消息',
    list_agents: '列出所有子助手', exit_plan_mode: '提交计划等你确认'
  };
  var GUIDE_ON_TEXT =
    '👋 小白导读：这个面板按时间顺序记录 AI 工作的每一步，从上到下是——\n' +
    '📋 系统提示词 = 软件发给 AI 的“工作说明书”（自动生成，不用细读）\n' +
    '🧑 用户 = 你发的消息　·　🧠 AI = AI 的思考和回复　·　🔧 工具调用 = AI 真正动手的动作（读文件 / 改代码 / 跑命令 / 搜索）\n' +
    '📦 已压缩 = 对话太长时，前面的内容被浓缩成摘要\n' +
    '每行下面的小字是本功能加的白话翻译讲解；点开任意一行可以在右侧看这一步的详细数据。';
  var GUIDE_OFF_TEXT = '轨迹翻译讲解已关闭，面板恢复英文原貌。点击下方「翻译：关」按钮可随时重新开启。';
  var KEY = 'tg-guide-enabled';
  var enabled = true;
  try { enabled = localStorage.getItem(KEY) !== '0'; } catch (e) { /* noop */ }
  var viewRoot = null;
  var bodyObserver = null;
  var intervalId = null;
  var viewObserver = null;
  var bannerEl = null;
  var chipBtn = null;
  var scheduled = false;
  // 文本节点 -> { orig: 第一次见到的英文, tr: 当前译文 }；关闭时精确还原
  var originals = new Map();

  function translateText(v) {
    var t = String(v).trim();
    if (t === '') return v;
    var hit = DICT[t];
    if (hit !== undefined) return v.replace(t, hit);
    for (var i = 0; i < RULES.length; i++) {
      var m = t.match(RULES[i][0]);
      if (m) return v.replace(t, RULES[i][1](m));
    }
    return v;
  }

  function walkText(root) {
    var walker = document.createTreeWalker(root, 4);
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentElement;
      if (parent && parent.closest('.tg-note, .tg-banner')) continue;
      var v = node.nodeValue;
      if (!v || !/[A-Za-z]/.test(v)) continue;
      var t = translateText(v);
      if (t === v) continue;
      // 文字变了就翻译（React 更新过的新英文也能跟上）；译文本身不再命中词典，不会循环
      var rec = originals.get(node);
      if (rec) rec.tr = t;
      else originals.set(node, { orig: v, tr: t });
      node.nodeValue = t;
    }
  }

  function translateInputs(root) {
    var inputs = root.querySelectorAll('input[placeholder]');
    for (var i = 0; i < inputs.length; i++) {
      var inp = inputs[i];
      if (inp.hasAttribute('data-tg-ph')) continue;
      var hit = DICT[String(inp.placeholder).trim()];
      if (hit !== undefined) {
        inp.setAttribute('data-tg-ph', inp.placeholder);
        inp.placeholder = hit;
      }
    }
  }

  function noteFor(row) {
    var kind = row.getAttribute('data-kind');
    if (!kind || !KIND_NOTES[kind]) return null;
    if (kind === 'tool' || kind === 'subtool') {
      var nameEl = row.querySelector('[class*="toolCallNameTypeface"]');
      var name = nameEl ? nameEl.textContent.trim() : '';
      var friendly = TOOL_NAMES[name];
      if (name) {
        return kind === 'tool'
          ? '「工具调用」AI 正在使用 ' + name + ' 工具' + (friendly ? '：' + friendly : '') + '。点开这一行可看具体动作和结果。'
          : '「子助手在干活」AI 的“分身”正在使用 ' + name + ' 工具' + (friendly ? '：' + friendly : '') + '。';
      }
    }
    return KIND_NOTES[kind];
  }

  function annotate(root) {
    var rows = root.querySelectorAll('tr[data-kind]');
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (row.hasAttribute('data-tg-note') || row.hasAttribute('data-collapsed-summary')) continue;
      var text = noteFor(row);
      if (!text) continue;
      var td = row.querySelector('td:last-child');
      if (!td) continue;
      var div = document.createElement('div');
      div.className = 'tg-note';
      div.textContent = '💡 ' + text;
      td.appendChild(div);
      row.setAttribute('data-tg-note', '1');
    }
  }

  function syncChip() {
    if (!chipBtn) return;
    var label = chipBtn.querySelector('.tg-chip-label');
    var labelText = enabled ? '翻译：开' : '翻译：关';
    // 值相等就不写 DOM —— 防 MutationObserver 死循环的关键
    if (label && label.textContent !== labelText) label.textContent = labelText;
    chipBtn.classList.toggle('tg-chip-on', enabled);
    chipBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    chipBtn.title = enabled ? '点击关闭轨迹面板的中文翻译与白话讲解' : '点击开启轨迹面板的中文翻译与白话讲解';
  }

  function updateBanner() {
    if (!bannerEl) return;
    var textEl = bannerEl.querySelector('.tg-banner-text');
    var text = enabled ? GUIDE_ON_TEXT : GUIDE_OFF_TEXT;
    if (textEl && textEl.textContent !== text) textEl.textContent = text;
    syncChip();
  }

  function ensureUI() {
    if (!viewRoot) return;
    if (!bannerEl || !bannerEl.isConnected) {
      bannerEl = document.createElement('div');
      bannerEl.className = 'tg-banner';

      var textEl = document.createElement('div');
      textEl.className = 'tg-banner-text';
      bannerEl.appendChild(textEl);

      var foot = document.createElement('div');
      foot.className = 'tg-banner-foot';

      var credit = document.createElement('span');
      credit.className = 'tg-banner-credit';
      credit.appendChild(document.createTextNode('✨ '));
      var link = document.createElement('a');
      link.href = 'https://chenshi.ai';
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.textContent = 'chenshi.ai';
      credit.appendChild(link);
      foot.appendChild(credit);

      chipBtn = document.createElement('button');
      chipBtn.type = 'button';
      chipBtn.className = 'tg-chip';
      chipBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="currentColor" stroke-opacity="0.55"/><text x="2.4" y="7.4" font-size="6.4" fill="currentColor" font-family="sans-serif">文</text><text x="8.4" y="11.8" font-size="8" fill="currentColor" font-family="sans-serif" font-weight="600">A</text></svg><span class="tg-chip-label"></span>';
      chipBtn.addEventListener('click', function () { setEnabled(!enabled); });
      foot.appendChild(chipBtn);

      bannerEl.appendChild(foot);

      var bar = viewRoot.querySelector('[role="toolbar"]');
      if (bar && bar.nextSibling) bar.parentNode.insertBefore(bannerEl, bar.nextSibling);
      else viewRoot.insertBefore(bannerEl, viewRoot.firstChild);
    }
    updateBanner();
  }

  function walkTabs() {
    var tabs = document.querySelectorAll('[role="tab"]');
    for (var i = 0; i < tabs.length; i++) walkText(tabs[i]);
  }

  function tick() {
    if (!viewRoot) return;
    ensureUI();
    if (!enabled) return;
    try {
      walkText(viewRoot);
      translateInputs(viewRoot);
      annotate(viewRoot);
      walkTabs();
    } catch (e) { /* noop */ }
  }

  function scheduleTick() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(function () { scheduled = false; tick(); });
  }

  function restore() {
    for (var pair of originals) {
      var node = pair[0];
      var rec = pair[1];
      // 只在当前值确实是我们的译文时还原，避免覆盖 React 后来写的新内容
      if (node.isConnected && node.nodeValue === rec.tr) node.nodeValue = rec.orig;
    }
    originals.clear();
    if (viewRoot) {
      var notes = viewRoot.querySelectorAll('.tg-note');
      for (var i = 0; i < notes.length; i++) notes[i].remove();
      var marked = viewRoot.querySelectorAll('[data-tg-note]');
      for (var i = 0; i < marked.length; i++) marked[i].removeAttribute('data-tg-note');
      var inputs = viewRoot.querySelectorAll('[data-tg-ph]');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].placeholder = inputs[i].getAttribute('data-tg-ph');
        inputs[i].removeAttribute('data-tg-ph');
      }
    }
  }

  function setEnabled(v) {
    enabled = v;
    try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) { /* noop */ }
    if (v) tick(); else restore();
    updateBanner();
  }

  function findViewRoot() {
    var pane = document.querySelector('[data-trajectory-scroll]');
    if (pane) {
      var el = pane;
      while (el.parentElement) {
        el = el.parentElement;
        if (el.querySelector('[role="toolbar"]')) return el;
      }
      return pane.parentElement || pane;
    }
    var bars = document.querySelectorAll('[role="toolbar"]');
    for (var i = 0; i < bars.length; i++) {
      var label = (bars[i].getAttribute('aria-label') || '').toLowerCase();
      if (label.indexOf('rajectory') !== -1 || label.indexOf('轨迹') !== -1) {
        return bars[i].parentElement || bars[i];
      }
    }
    return null;
  }

  function attach(root) {
    viewRoot = root;
    viewObserver = new MutationObserver(function () { scheduleTick(); });
    viewObserver.observe(root, { subtree: true, childList: true, characterData: true });
    tick();
  }

  function detach() {
    if (viewObserver) { viewObserver.disconnect(); viewObserver = null; }
    viewRoot = null;
    bannerEl = null;
    chipBtn = null;
    for (var pair of originals) {
      if (!pair[0].isConnected) originals.delete(pair[0]);
    }
  }

  // 只负责视图的挂载/卸载检测；面板内部变化交给 viewObserver，
  // 兜底交给 heartbeat —— 全页面任何变动都全量扫描的热路径已被移除
  function syncView() {
    try {
      var root = findViewRoot();
      if (root !== viewRoot) {
        if (viewRoot) detach();
        if (root) attach(root);
      }
    } catch (e) { /* noop */ }
  }

  function heartbeat() {
    if (document.hidden) return;
    syncView();
    if (viewRoot) { try { tick(); } catch (e) { /* noop */ } }
  }

  function boot() {
    try {
      var style = document.createElement('style');
      style.textContent =
        '.tg-banner { margin: 6px 8px; padding: 8px 12px; border: 1px solid var(--dsw-alias-border-l2, #e0e0e0); border-radius: 8px; background: var(--dsw-alias-bg-layer-2, rgba(127,127,127,0.07)); color: var(--dsw-alias-label-secondary, #666); font-size: 12px; line-height: 20px; }' +
        '.tg-banner-text { white-space: pre-line; }' +
        '.tg-banner-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 6px; }' +
        '.tg-banner-credit { font-size: 11px; color: var(--dsw-alias-label-tertiary, #8a8a8a); }' +
        '.tg-banner-credit a { color: var(--dsw-static-blue-500, #3b6fe0); text-decoration: none; font-weight: 600; }' +
        '.tg-banner-credit a:hover { text-decoration: underline; }' +
        '.tg-chip { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 999px; border: 1px solid var(--dsw-alias-border-l2, #c8c8c8); background: transparent; color: inherit; font-size: 12px; line-height: 18px; cursor: pointer; flex: none; }' +
        '.tg-chip.tg-chip-on { background: var(--dsw-static-blue-500, #3b6fe0); border-color: transparent; color: #fff; }' +
        '.tg-note { margin-top: 3px; padding: 3px 8px; border-radius: 4px; background: var(--dsw-alias-bg-layer-2, rgba(127,127,127,0.08)); color: var(--dsw-alias-label-tertiary, #8a8a8a); font-size: 11px; line-height: 16px; white-space: normal; }';
      document.head.appendChild(style);

      bodyObserver = new MutationObserver(function () { syncView(); });
      bodyObserver.observe(document.body, { subtree: true, childList: true });
      syncView();

      intervalId = window.setInterval(heartbeat, 2000);
    } catch (e) { /* noop */ }
  }

  if (document.body) boot();
  else document.addEventListener('DOMContentLoaded', boot);

			ctx.effect(function () {
				try {
					if (bodyObserver) bodyObserver.disconnect();
					if (intervalId !== null) window.clearInterval(intervalId);
					detach();
					restore();
				} catch (e) { /* noop */ }
			}, 'trajectory-zh-guide: cleanup');
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
