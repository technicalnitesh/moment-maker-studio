import {
  SITE_URL,
  SOCIAL_HASHTAGS,
  WHATSAPP_MESSAGE_TEMPLATE,
} from "@/config/site";
import { categoryName } from "@/lib/catalog";
import type { Product } from "@/data/types";

/** Absolute URL for sharing — uses the live origin in the browser. */
export function absoluteUrl(path: string) {
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : SITE_URL;
  return `${origin}${path}`;
}

export function productPath(product: Pick<Product, "slug">) {
  return `/project/${product.slug}`;
}

export function productUrl(product: Pick<Product, "slug">) {
  return absoluteUrl(productPath(product));
}

export function whatsappMessage(product: Product) {
  return WHATSAPP_MESSAGE_TEMPLATE.replace("{name}", product.name)
    .replace("{category}", categoryName(product.category))
    .replace("{url}", productUrl(product))
    .replace("{hashtags}", SOCIAL_HASHTAGS.join(" "));
}

export function shareTargets(product: Product) {
  const url = productUrl(product);
  const text = `${product.name} — ${product.short_description}`;
  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(whatsappMessage(product))}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    url,
  };
}

export async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export function canNativeShare() {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function nativeShare(product: Product) {
  if (!canNativeShare()) return false;
  try {
    await navigator.share({
      title: product.name,
      text: product.short_description,
      url: productUrl(product),
    });
    return true;
  } catch {
    return false;
  }
}
