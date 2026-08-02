export const FB_PIXEL_ID = "1021196580529332";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[] };
  }
}

/** 生成唯一 event_id，用于浏览器 Pixel 与 CAPI 去重 */
export function createEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** 浏览器端 Pixel 事件（带 eventID），并附带 image beacon 兜底 */
export function sendBrowserPixelEvent(
  eventName: string,
  customData: Record<string, unknown> = {},
  eventId: string = createEventId(),
): string {
  if (typeof window === "undefined") return eventId;

  try {
    window.fbq?.("track", eventName, customData, { eventID: eventId });
  } catch {
    /* noop */
  }

  try {
    const img = new Image(1, 1);
    const params = new URLSearchParams({
      id: FB_PIXEL_ID,
      ev: eventName,
      noscript: "1",
      eid: eventId,
    });
    img.src = `https://www.facebook.com/tr?${params.toString()}`;
  } catch {
    /* noop */
  }

  return eventId;
}

/** 服务端 Conversions API 事件（经由 /api/public/fb-event 转发） */
export async function sendCapiEvent(
  eventName: string,
  eventId: string,
  customData: Record<string, unknown> = {},
): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/public/fb-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: window.location.href,
        custom_data: customData,
      }),
      keepalive: true,
    });
  } catch {
    /* noop */
  }
}

/** PageView：浏览器 + CAPI 共用同一个 eventID */
export function trackPageView(): string {
  const eventId = createEventId();
  sendBrowserPixelEvent("PageView", {}, eventId);
  void sendCapiEvent("PageView", eventId);
  return eventId;
}
