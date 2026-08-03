/**
 * ============================================================
 *  CONFIGURACIÓN DE DESCARGA  /  下载配置
 * ------------------------------------------------------------
 *  这个文件是你唯一需要修改的地方。
 *  部署到 Vercel 之后，随时改这里的链接即可。
 *
 *  Este es el único archivo que necesitas editar para cambiar
 *  los enlaces de descarga de la app.
 * ============================================================
 */

export const appConfig = {
  /** 品牌名 / Nombre de la marca */
  brandName: "ReelShort",

  /** 副标题 / Eslogan */
  tagline: "Series verticales. Un capítulo, un minuto.",

  /**
   * 通用下载链接（推荐用 OneLink / Branch 智能链接）
   * Enlace universal de descarga (smart link recomendado).
   * 当下面的 iOS / Android 链接为空时，会使用这个。
   */
  downloadUrl: "https://lovetogetherx.com/2a8IqqWBiNrD",

  /** App Store 链接（iOS）。留空则使用 downloadUrl。 */
  iosUrl: "",

  /** Google Play 链接（Android）。留空则使用 downloadUrl。 */
  androidUrl: "",

  /**
   * 点击链接时是否在新标签页打开。
   * true = nueva pestaña, false = misma pestaña.
   */
  openInNewTab: true,
} as const;

/** 根据设备返回正确的下载链接 / Devuelve el enlace según el dispositivo. */
export function getDownloadUrl(platform?: "ios" | "android"): string {
  if (platform === "ios") return appConfig.iosUrl || appConfig.downloadUrl;
  if (platform === "android") return appConfig.androidUrl || appConfig.downloadUrl;

  if (typeof navigator !== "undefined") {
    const ua = navigator.userAgent || "";
    if (/iPad|iPhone|iPod/i.test(ua)) return appConfig.iosUrl || appConfig.downloadUrl;
    if (/Android/i.test(ua)) return appConfig.androidUrl || appConfig.downloadUrl;
  }
  return appConfig.downloadUrl;
}

/** 触发下载跳转 / Lanza la descarga. */
export function goToDownload(platform?: "ios" | "android"): void {
  const url = getDownloadUrl(platform);
  if (typeof window === "undefined") return;
  if (appConfig.openInNewTab) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = url;
  }
}
