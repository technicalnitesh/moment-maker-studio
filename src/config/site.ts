/**
 * Central configuration for Bhopali Mitra.
 * Change labels, brand copy and share templates here — never in components.
 */

export const BRAND_NAME = "Bhopali Mitra";
export const BRAND_TAGLINE = "Don't Just Send a Wish. Create a Moment.";
export const BRAND_SUB_TAGLINE =
  "Beautiful interactive digital experiences for birthdays, anniversaries, proposals, love, memories and special moments.";

export const SITE_URL = "https://bhopalimitra.com";

/** Primary call to action label used across the whole app. */
export const GRAB_LABEL = "GRAB PROJECT";
export const PREVIEW_LABEL = "Live Preview";
export const DOWNLOAD_LABEL = "Download Project";

export const DEFAULT_META_TITLE = `${BRAND_NAME} — ${BRAND_TAGLINE}`;
export const DEFAULT_META_DESCRIPTION =
  "Discover beautiful interactive digital surprises for birthdays, anniversaries, proposals, love, memories and every special moment. Preview live, then grab it free.";

export const SOCIAL_HASHTAGS = ["#GRABPROJECT", "#BhopaliMitra"];
export const PRIMARY_SOCIAL_TAG = "#GRABPROJECT";

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/bhopalimitra",
  whatsapp: "https://wa.me/919999999999",
};

export const CONTACT = {
  email: "hello@bhopalimitra.com",
  city: "Bhopal, Madhya Pradesh, India",
};

/**
 * WhatsApp share template. Tokens: {name} {category} {url} {hashtags}
 * Kept here so the message can be changed without touching UI code.
 */
export const WHATSAPP_MESSAGE_TEMPLATE = `🎁 I found something special on ${BRAND_NAME}!

✨ {name} ({category})

👀 Preview it here:
{url}

💚 Grab this project for FREE

{hashtags}`;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Categories", to: "/categories" },
  { label: "Trending", to: "/trending" },
  { label: "About", to: "/about" },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
  { label: "Refund Policy", to: "/refund-policy" },
  { label: "Cookie Policy", to: "/cookie-policy" },
] as const;

export const COPYRIGHT = `© 2026 ${BRAND_NAME}. All rights reserved.`;
