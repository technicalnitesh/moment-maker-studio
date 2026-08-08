import type { ReactNode } from "react";

/** Shared shell for text-first pages (about, contact, legal). */
export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        {intro ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>
        ) : null}
      </header>
      <div className="mt-10 space-y-8">{children}</div>
    </div>
  );
}

export function Block({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="card-surface rounded-3xl p-6">
      <h2 className="text-xl font-bold">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
