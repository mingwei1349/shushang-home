/* 数商之家 AI 顾问悬浮窗 —— 点击跳转到同站 ai.html 聊天页 */
(function () {
  if (window.__sszAiWidget) return;
  window.__sszAiWidget = true;

  // 同站 ai.html，GitHub Pages 域名，微信内可正常打开
  var CHAT_PAGE = "ai.html";

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
    "@media(max-width:520px){.ssz-ai-btn{bottom:20px;right:18px;width:54px;height:54px;}.ssz-ai-tip{bottom:30px;right:86px;}}"
  ].join("");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var btn = document.createElement("a");
  btn.href = CHAT_PAGE;
  btn.className = "ssz-ai-btn";
  btn.setAttribute("aria-label", "AI 顾问");
  btn.innerHTML =
    '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 ' +
    '8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 ' +
    '8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg><span class="ssz-ai-dot"></span>';

  var tip = document.createElement("div");
  tip.className = "ssz-ai-tip";
  tip.textContent = "有问题？问 AI 顾问";

  btn.addEventListener("mouseenter", function () { tip.classList.add("show"); });
  btn.addEventListener("mouseleave", function () { tip.classList.remove("show"); });

  setTimeout(function () {
    tip.classList.add("show");
    setTimeout(function () { tip.classList.remove("show"); }, 4000);
  }, 2000);

  document.body.appendChild(btn);
  document.body.appendChild(tip);
})();
