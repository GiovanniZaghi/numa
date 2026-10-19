"use client";

import {
  detectMobilePlatform,
  instagramAndroidIntent,
  instagramIosScheme,
  instagramWebUrl,
} from "@/lib/instagram";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

interface InstagramLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  username: string;
}

/**
 * Link para um perfil do Instagram. No celular tenta abrir direto no app,
 * com fallback para o site; no desktop abre em nova aba.
 */
export function InstagramLink({ username, onClick, ...props }: InstagramLinkProps) {
  const webUrl = instagramWebUrl(username);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;

    const platform = detectMobilePlatform(navigator.userAgent, navigator.maxTouchPoints);
    if (!platform) return;

    event.preventDefault();

    if (platform === "android") {
      window.location.href = instagramAndroidIntent(username);
      return;
    }

    // iOS: se o app abrir, a página vai para segundo plano e o fallback é cancelado.
    const fallback = window.setTimeout(() => {
      if (document.visibilityState === "visible") window.location.href = webUrl;
    }, 1500);
    const cancel = () => {
      if (document.visibilityState === "hidden") window.clearTimeout(fallback);
    };
    document.addEventListener("visibilitychange", cancel, { once: true });
    window.location.href = instagramIosScheme(username);
  }

  return <a href={webUrl} target="_blank" rel="noopener noreferrer" onClick={handleClick} {...props} />;
}
