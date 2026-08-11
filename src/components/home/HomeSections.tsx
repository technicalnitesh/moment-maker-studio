import { Link } from "@tanstack/react-router";
import { ArrowRight, Download, Eye, Instagram, Search, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CategoryCard } from "@/components/product/CategoryCard";
import { categories } from "@/data/products";
import { GRAB_LABEL, PRIMARY_SOCIAL_TAG } from "@/config/site";
import instagramThumb from "@/assets/thumb-birthday.jpg";

const FLOW = ["Instagram", GRAB_LABEL, "Bhopali Mitra", "Live Preview", "Grab", "Download"];

export function InstagramSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="card-surface hairline-top relative overflow-hidden rounded-4xl p-6 sm:p-10">
        <div
          aria-hidden
          className="bg-gradient-warm pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-20 blur-3xl"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
              <Instagram className="size-3.5" aria-hidden />
              Instagram first
            </p>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Saw it on Instagram?</h2>
            <p className="text-gradient mt-2 text-xl font-bold sm:text-2xl">
              Find it. Preview it. Grab it.
            </p>

            <ol className="mt-7 flex flex-wrap items-center gap-2">
              {FLOW.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="glass rounded-full px-3.5 py-2 text-xs font-semibold">
                    {step}
                  </span>
                  {i < FLOW.length - 1 ? (
                    <ArrowRight className="size-3.5 text-muted-foreground" aria-hidden />
                  ) : null}
                </li>
              ))}
            </ol>

            <Button variant="hero" size="xl" asChild className="mt-8">
              <Link to="/projects">
                Find your project
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>

          {/* <Reveal className="mx-auto w-full max-w-xs">
            <div className="card-surface overflow-hidden rounded-3xl">
              <div className="flex items-center gap-2.5 p-3.5">
                <span className="bg-gradient-brand grid size-8 place-items-center rounded-full text-[11px] font-bold text-primary-foreground">
                  BM
                </span>
                <span className="text-sm font-semibold">bhopalimitra</span>
              </div>
              <img
                src={instagramThumb}
                alt="Instagram post showing an interactive birthday surprise"
                width={1200}
                height={800}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="p-3.5">
                <p className="text-sm">
                  Interactive Birthday Surprise ✨ Comment{" "}
                  <span className="text-gradient font-bold">{PRIMARY_SOCIAL_TAG}</span>
                </p>
              </div>
            </div>
          </Reveal> */}
        </div>
      </div>
    </section>
  );
}

export function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Explore by occasion"
        title="Every moment has its own surprise"
        description="Pick an occasion and find an experience that already feels personal."
        action={
          <Button variant="soft" size="pill" asChild>
            <Link to="/categories">All categories</Link>
          </Button>
        }
      />
      <div className="no-scrollbar mt-8 -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.id} delay={i * 50} className="min-w-[15rem] snap-start sm:min-w-0">
            <CategoryCard category={c} className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  {
    no: "01",
    title: "DISCOVER",
    text: "Find a digital surprise you love.",
    icon: <Search aria-hidden />,
  },
  {
    no: "02",
    title: "PREVIEW",
    text: "Experience the actual product before grabbing it.",
    icon: <Eye aria-hidden />,
  },
  {
    no: "03",
    title: "GRAB",
    text: "Grab the project and download it.",
    icon: <Download aria-hidden />,
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        eyebrow="How it works"
        title="Discover → Preview → Grab"
        description="Three steps between an Instagram scroll and a moment they'll remember."
        align="center"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.no} delay={i * 90}>
            <div className="card-surface group relative h-full overflow-hidden rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1.5">
              <span className="font-display text-5xl font-bold text-primary/20">{s.no}</span>
              <div className="mt-4 grid size-11 place-items-center rounded-2xl bg-primary/12 text-primary">
                {s.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-wide">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const WHY = [
  {
    icon: "🎁",
    title: "Ready Experiences",
    text: "Beautiful digital surprises already prepared.",
  },
  { icon: "👀", title: "Live Preview", text: "See the actual experience before grabbing." },
  { icon: "⚡", title: "Instant Access", text: "Simple grab and download flow." },
  { icon: "📱", title: "Made for Social", text: "Perfect for Instagram and WhatsApp discovery." },
];

export function WhySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Why Bhopali Mitra"
        title="Built for moments, not downloads"
        align="center"
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={i * 70}>
            <div className="card-surface h-full rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1.5">
              <span className="text-2xl">{w.icon}</span>
              <h3 className="mt-4 text-base font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Reveal>
        <div className="card-surface hairline-top relative overflow-hidden rounded-4xl px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden
            className="animate-pulse-glow bg-gradient-brand pointer-events-none absolute inset-x-1/4 -top-24 h-56 rounded-full opacity-25 blur-3xl"
          />
          <p className="relative inline-flex items-center gap-2 rounded-full bg-primary/12 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="size-3.5" aria-hidden />
            All free right now
          </p>
          <h2 className="relative mx-auto mt-6 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
            Don't Just Send a Wish.{" "}
            <span className="text-gradient">Create a Moment.</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Preview any experience live, grab it in seconds, and make someone's day unforgettable.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="xl" asChild>
              <Link to="/projects">
                <Zap aria-hidden />
                Explore Surprises
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/trending">🔥 Trending Now</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
