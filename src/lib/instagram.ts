export function instagramWebUrl(username: string): string {
  return `https://www.instagram.com/${username}/`;
}

/** Android: abre o app pelo intent e, se não estiver instalado, o Chrome segue para o fallback web. */
export function instagramAndroidIntent(username: string): string {
  const fallback = encodeURIComponent(instagramWebUrl(username));
  return `intent://instagram.com/_u/${username}/#Intent;package=com.instagram.android;scheme=https;S.browser_fallback_url=${fallback};end`;
}

/** iOS: esquema próprio do app. */
export function instagramIosScheme(username: string): string {
  return `instagram://user?username=${username}`;
}

export type MobilePlatform = "android" | "ios" | null;

export function detectMobilePlatform(userAgent: string, maxTouchPoints = 0): MobilePlatform {
  if (/android/i.test(userAgent)) return "android";
  // iPadOS se apresenta como Mac; maxTouchPoints diferencia do desktop.
  if (/iphone|ipad|ipod/i.test(userAgent) || (/macintosh/i.test(userAgent) && maxTouchPoints > 1)) {
    return "ios";
  }
  return null;
}
