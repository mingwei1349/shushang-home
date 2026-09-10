/* 数商之家 AI 顾问悬浮窗 —— 在任意页面引入本文件即可 */
(function () {
  if (window.__sszAiWidget) return;
  window.__sszAiWidget = true;

  /* 微信内置浏览器无法打开 *.app.workbuddy.link，临时隐藏浮窗避免用户误点 */
  var isWeixin = /MicroMessenger/i.test(navigator.userAgent);
  if (isWeixin) return;

  var AGENT_URL = "https://6d780514665048a8a9bb30ab27ac3c24.app.workbuddy.link?from=site";

  /* 样式 */
  var css = [
    ".ssz-ai-btn{position:fixed;bottom:26px;right:26px;z-index:99990;width:58px;height:58px;",
    "border:none;border-radius:50%;cursor:pointer;box-shadow:0 6px 20px rgba(249,115,22,.45);",
    "background:linear-gradient(135deg,#f97316,#fb923c);display:flex;align-items:center;justify-content:center;",
    "transition:transform .2s ease,box-shadow .2s ease;}",
    ".ssz-ai-btn:hover{transform:scale(1.08);box-shadow:0 8px 26px rgba(249,115,22,.55);}",
    ".ssz-ai-btn svg{width:26px;height:26px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}",
    ".ssz-ai-dot{position:absolute;top:2px;right:2px;width:12px;height:12px;border-radius:50%;",
    "background:#22c55e;border:2px solid #fff;}",
    ".ssz-ai-tip{position:fixed;bottom:36px;right:96px;z-index:99990;background:#0f2547;color:#fff;",
    "font-size:13px;padding:8px 14px;border-radius:10px;box-shadow:0 4px 14px rgba(0,0,0,.25);",
    "white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .3s;}",
    ".ssz-ai-tip.show{opacity:1;}",
    ".ssz-ai-panel{position:fixed;bottom:98px;right:26px;z-index:99991;width:400px;height:640px;",
    "max-height:calc(100vh - 120px);max-width:calc(100vw - 32px);border-radius:16px;overflow:hidden;",
    "box-shadow:0 18px 50px rgba(15,37,71,.35);display:none;flex-direction:column;",
    "border:1px solid rgba(15,37,71,.12);background:#fff;}",
    ".ssz-ai-panel.open{display:flex;animation:sszPop .22s ease;}",
    "@keyframes sszPop{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}",
    ".ssz-ai-head{background:linear-gradient(135deg,#0f2547,#1d3f75);color:#fff;padding:12px 16px;",
    "display:flex;align-items:center;gap:10px;flex-shrink:0;}",
    ".ssz-ai-head b{font-size:15px}",
    ".ssz-ai-head small{font-size:11px;opacity:.75;display:block;margin-top:2px}",
    ".ssz-ai-close{margin-left:auto;background:rgba(255,255,255,.15);border:none;color:#fff;",
    "width:28px;height:28px;border-radius:8px;cursor:pointer;font-size:16px;line-height:1;}",
    ".ssz-ai-close:hover{background:rgba(255,255,255,.3)}",
    ".ssz-ai-frame{flex:1;border:none;width:100%;}",
    "@media(max-width:520px){",
    ".ssz-ai-panel{bottom:0;right:0;width:100vw;height:100vh;max-height:100vh;border-radius:0;}",
    ".ssz-ai-head{padding-top:16px}}",
    ".ssz-ai-backdrop{position:fixed;inset:0;z-index:99989;background:rgba(15,37,71,.35);display:none;}",
    ".ssz-ai-backdrop.show{display:block}"
  ].join("");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* 悬浮按钮 */
  var btn = document.createElement("button");
  btn.className = "ssz-ai-btn";
  btn.setAttribute("aria-label", "AI 顾问");
  btn.innerHTML =
    '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 ' +
    '8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 ' +
    '8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg><span class="ssz-ai-dot"></span>';

  var tip = document.createElement("div");
  tip.className = "ssz-ai-tip";
  tip.textContent = "有问题？问 AI 顾问";

  /* 弹出面板 */
  var backdrop = document.createElement("div");
  backdrop.className = "ssz-ai-backdrop";

  var panel = document.createElement("div");
  panel.className = "ssz-ai-panel";
  panel.innerHTML =
    '<div class="ssz-ai-head">' +
    '<div><b>数商之家 AI 顾问</b><small>数字经济 · 数据要素 · 数据资产</small></div>' +
    '<button class="ssz-ai-close" aria-label="关闭">×</button></div>' +
    '<iframe class="ssz-ai-frame" src="' + AGENT_URL + '" title="数商之家 AI 顾问"></iframe>';

  function open() {
    panel.classList.add("open");
    if (window.innerWidth <= 520) backdrop.classList.add("show");
    tip.classList.remove("show");
  }
  function close() {
    panel.classList.remove("open");
    backdrop.classList.remove("show");
  }
  btn.addEventListener("click", function () {
    panel.classList.contains("open") ? close() : open();
  });
  panel.querySelector(".ssz-ai-close").addEventListener("click", close);
  backdrop.addEventListener("click", close);

  /* 首次进入 2 秒后轻提示，只提示一次 */
  setTimeout(function () {
    if (!panel.classList.contains("open")) {
      tip.classList.add("show");
      setTimeout(function () { tip.classList.remove("show"); }, 4000);
    }
  }, 2000);

  document.body.appendChild(backdrop);
  document.body.appendChild(panel);
  document.body.appendChild(btn);
  document.body.appendChild(tip);
})();
