import { createEventId, sendBrowserPixelEvent, sendCapiEvent } from "./facebook-tracking";
import { getDownloadUrl } from "@/config/app-config";

/**
 * 唯一下载入口：先发送 Pixel + CAPI 的 Download 事件（共享 event_id），
 * 150ms 后用隐藏 iframe 触发下载，当前页面不跳转。
 */
export function trackDownload(urlOrPlatform?: string | "ios" | "android"): void {
  if (typeof window === "undefined") return;

  const url =
    urlOrPlatform === "ios" || urlOrPlatform === "android" || urlOrPlatform === undefined
      ? getDownloadUrl(urlOrPlatform as "ios" | "android" | undefined)
      : urlOrPlatform;

  const eventId = createEventId();
  const customData = { content_name: "app_download", download_url: url };

  sendBrowserPixelEvent("Download", customData, eventId);
  void sendCapiEvent("Download", eventId, customData);

  window.setTimeout(() => {
    try {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.setAttribute("aria-hidden", "true");
      iframe.src = url;
      document.body.appendChild(iframe);
      window.setTimeout(() => iframe.remove(), 15000);
    } catch {
      /* noop */
    }
  }, 150);
}
