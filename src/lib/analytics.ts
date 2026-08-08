import type { Product } from "@/data/types";

/**
 * Analytics + delivery abstraction.
 *
 * Events are no-ops today; wiring a provider later means editing only this
 * file. Download/preview go through here so future payment verification can
 * be inserted before delivery without touching UI code.
 */

export type AnalyticsEvent =
  | "product_view"
  | "preview_click"
  | "grab_click"
  | "download_click"
  | "share_whatsapp"
  | "share_copy"
  | "search";

export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, payload);
  }
}

/** Products are all free today. Paid products can gate here in future. */
export function requiresPayment(product: Product) {
  return !product.is_free;
}

export function openExternal(url: string) {
  if (typeof window === "undefined") return;
  window.open(url, "_blank", "noopener,noreferrer");
}


export async function deliverDownload(product: Product) {
  track("download_click", {
    slug: product.slug,
    grab_code: product.grab_code,
  });

  if (!product.download_url) return false;

  await new Promise((resolve) => setTimeout(resolve, 30000));

  openExternal(product.download_url);
  return true;
}


export async function deliverDownload(product: Product) {
  track("download_click", {
    slug: product.slug,
    grab_code: product.grab_code,
  });

  if (!product.download_url) return false;

  // 30 seconds delay
  await new Promise((resolve) => setTimeout(resolve, 30000));

  const link = document.createElement("a");
  link.href = product.download_url;
  link.download = getFileName(product.download_url);

  document.body.appendChild(link);
  link.click();
  link.remove();

  return true;
}

function getFileName(url: string) {
  try {
    const pathname = new URL(url, window.location.origin).pathname;
    const filename = pathname.split("/").pop();

    return filename || "download";
  } catch {
    return "download";
  }
}
