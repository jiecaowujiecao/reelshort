import { createFileRoute } from "@tanstack/react-router";

const FB_PIXEL_ID = "1021196580529332";
const GRAPH_URL = `https://graph.facebook.com/v20.0/${FB_PIXEL_ID}/events`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export const Route = createFileRoute("/api/public/fb-event")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        const token = process.env["FACEBOOK_CAPI_ACCESS_TOKEN"];
        // 未配置 token（例如预览环境）时不算失败：浏览器 Pixel 仍照常上报。
        if (!token) return json({ skipped: true, reason: "capi_token_not_configured" }, 200);


        let payload: Record<string, unknown>;
        try {
          payload = (await request.json()) as Record<string, unknown>;
        } catch {
          return json({ error: "Invalid JSON body" }, 400);
        }

        const eventName = typeof payload["event_name"] === "string" ? payload["event_name"] : null;
        const eventId = typeof payload["event_id"] === "string" ? payload["event_id"] : null;
        if (!eventName || !eventId) return json({ error: "event_name and event_id required" }, 400);

        const ip =
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          undefined;

        const body = {
          data: [
            {
              event_name: eventName,
              event_time: Math.floor(Date.now() / 1000),
              event_id: eventId,
              action_source: "website",
              ...(typeof payload["event_source_url"] === "string"
                ? { event_source_url: payload["event_source_url"] }
                : {}),
              user_data: {
                ...(ip ? { client_ip_address: ip } : {}),
                client_user_agent: request.headers.get("user-agent") ?? "",
              },
              custom_data:
                (payload["custom_data"] as Record<string, unknown> | undefined) ?? {},
            },
          ],
        };

        try {
          const res = await fetch(`${GRAPH_URL}?access_token=${encodeURIComponent(token)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const result = (await res.json()) as Record<string, unknown>;
          return json(result, res.ok ? 200 : 502);
        } catch (error) {
          return json({ error: "Upstream request failed", detail: String(error) }, 502);
        }
      },
    },
  },
});
