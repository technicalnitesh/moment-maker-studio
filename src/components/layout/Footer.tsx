import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Sparkles } from "lucide-react";

import {
  BRAND_NAME,
  COPYRIGHT,
  LEGAL_LINKS,
  NAV_LINKS,
  PRIMARY_SOCIAL_TAG,
  SOCIAL_LINKS,
} from "@/config/site";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="bg-gradient-brand grid size-9 place-items-center rounded-xl text-primary-foreground">
              <Sparkles className="size-4" aria-hidden />
            </span>
            <span className="font-display text-lg font-bold">{BRAND_NAME}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Beautiful digital experiences for life's special moments.
          </p>
          <p className="text-gradient mt-4 text-sm font-bold tracking-wide">
            {PRIMARY_SOCIAL_TAG}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="focus-ring text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="focus-ring text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Legal</h2>
          <ul className="mt-4 space-y-2.5">
            {LEGAL_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="focus-ring text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Social</h2>
          <div className="mt-4 flex gap-2.5">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="focus-ring grid size-11 place-items-center rounded-2xl border border-border bg-secondary/50 transition-all duration-200 hover:-translate-y-0.5 hover:text-primary"
            >
              <Instagram className="size-4" aria-hidden />
            </a>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="focus-ring grid size-11 place-items-center rounded-2xl border border-border bg-secondary/50 transition-all duration-200 hover:-translate-y-0.5 hover:text-success"
            >
              <MessageCircle className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground">{COPYRIGHT}</p>
      </div>
    </footer>
  );
}
