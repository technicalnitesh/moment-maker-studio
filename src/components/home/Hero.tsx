import { Link } from "@tanstack/react-router";
import { ArrowRight, Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BRAND_SUB_TAGLINE, BRAND_TAGLINE } from "@/config/site";
import heroBirthday from "@/assets/thumb-birthday.jpg";
import heroLove from "@/assets/thumb-love.jpg";
import heroProposal from "@/assets/thumb-proposal.jpg";

const FLOATING = [
  { label: "🎂 BIRTHDAY", className: "left-0 top-8", delay: "0s" },
  { label: "❤️ LOVE", className: "right-2 top-24", delay: "1.1s" },
  { label: "💍 PROPOSAL", className: "left-2 bottom-24", delay: "2.2s" },
  { label: "💐 ANNIVERSARY", className: "right-0 bottom-10", delay: "0.6s" },
  { label: "✨ FREE", className: "left-1/2 -translate-x-1/2 -top-2", delay: "1.7s" },
  { label: "🔥 TRENDING", className: "left-1/2 -translate-x-1/2 -bottom-4", delay: "2.6s" },
];

export function Hero() {
  return (
    <section className="bg-hero-aura relative overflow-hidden pb-8 pt-28 sm:pt-32 lg:pb-16 lg:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="animate-fade-up">
          <p className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            <Flame className="size-3.5" aria-hidden />
            All projects free right now
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[4rem]">
            Don't Just Send a Wish.{" "}
            <span className="text-gradient animate-drift">Create a Moment.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Discover beautiful interactive digital surprises for birthdays, anniversaries,
            proposals, love, memories and every special moment.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="hero" size="xl" asChild>
              <Link to="/projects">
                Explore Surprises
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/trending">🔥 Trending Now</Link>
            </Button>
          </div>

          <p className="sr-only">{BRAND_TAGLINE}. {BRAND_SUB_TAGLINE}</p>
        </div>

        {/* Device mockup with floating experience cards */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div
            aria-hidden
            className="animate-pulse-glow bg-gradient-brand absolute inset-8 rounded-full opacity-30 blur-3xl"
          />
          <div className="relative mx-auto w-[62%] min-w-[190px]">
            <div className="card-surface animate-float relative overflow-hidden rounded-[2.25rem] p-2.5 shadow-[var(--shadow-lift)]">
              <div className="overflow-hidden rounded-[1.75rem]">
                <img
                  src={heroBirthday}
                  alt="Interactive birthday surprise experience shown on a phone"
                  width={1200}
                  height={800}
                  className="aspect-[9/16] w-full object-cover"
                />
              </div>
              <span
                aria-hidden
                className="absolute left-1/2 top-3.5 h-1.5 w-14 -translate-x-1/2 rounded-full bg-foreground/25"
              />
            </div>
          </div>

          <div
            className="card-surface animate-float absolute -left-2 top-16 w-28 overflow-hidden rounded-2xl p-1.5 sm:w-32"
            style={{ animationDelay: "1.4s" }}
          >
            <img
              src={heroLove}
              alt="Digital love letter experience"
              width={1200}
              height={800}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
          </div>
          <div
            className="card-surface animate-float absolute -right-2 bottom-20 w-28 overflow-hidden rounded-2xl p-1.5 sm:w-32"
            style={{ animationDelay: "2.1s" }}
          >
            <img
              src={heroProposal}
              alt="Interactive marriage proposal experience"
              width={1200}
              height={800}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
          </div>

          {FLOATING.map((f) => (
            <span
              key={f.label}
              className={`glass animate-float absolute rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider sm:text-[11px] ${f.className}`}
              style={{ animationDelay: f.delay }}
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
