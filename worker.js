/**
 * 数商之家 AI 顾问 — Cloudflare Workers 代理
 * 作用：前端（GitHub Pages）调用本 Worker，Worker 转发到 DeepSeek 并隐藏 API Key。
 *
 * 部署步骤（Cloudflare 免费账号）：
 *   1. 登录 dash.cloudflare.com → Workers & Pages → 创建 Worker，名称例如 shushang-ai-advisor
 *   2. 把本文件内容粘贴进编辑器，部署（地址形如 https://shushang-ai-advisor.<子域>.workers.dev）
 *   3. 在 Worker 的 Settings → Variables → 添加环境变量 DEEPSEEK_KEY = 你的 DeepSeek API Key（选 Secret）
 *   4. 把前端 ai.html 里的 WORKER_URL 改成 https://<你的子域>.workers.dev/api/chat
 *
 * 注意：Worker 的路由是 /api/chat，前端只调这个路径。
 */

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
const ALLOWED_ORIGIN = "*"; // 如需限制，可改成 https://mingwei1349.github.io

function cors(resp) {
  resp.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  resp.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  resp.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return resp;
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return cors(new Response(null, { status: 204 }));
    }
    if (request.method !== "POST") {
      return cors(new Response("Method Not Allowed", { status: 405 }));
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return cors(new Response("Invalid JSON", { status: 400 }));
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (!messages.length) {
      return cors(new Response("messages required", { status: 400 }));
    }

    try {
      const upstream = await fetch(DEEPSEEK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + env.DEEPSEEK_KEY,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: messages,
          temperature: 0.7,
          stream: false,
        }),
      });

      const data = await upstream.text();
      const out = new Response(data, {
        status: upstream.status,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      return cors(out);
    } catch (e) {
      return cors(new Response(JSON.stringify({ error: String(e) }), {
        status: 502,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }));
    }
  },
};
