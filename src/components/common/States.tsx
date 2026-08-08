import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon = "🔍",
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string | undefined;
  actionLabel?: string | undefined;
  actionTo?: string | undefined;
  onAction?: (() => void) | undefined;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "card-surface flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center",
        className,
      )}
    >
      <div className="mb-5 grid size-14 place-items-center rounded-2xl bg-primary/12 text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {actionLabel && actionTo ? (
        <Link
          to={actionTo}
          className="focus-ring mt-6 inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
        >
          {actionLabel}
        </Link>
      ) : null}
      {actionLabel && !actionTo && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="focus-ring mt-6 inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export function ErrorState({
  title,
  description,
  actionLabel = "Back to Projects",
  actionTo = "/projects",
  icon = "🌙",
}: {
  title: string;
  description?: string | undefined;
  actionLabel?: string;
  actionTo?: string;
  icon?: ReactNode;
}) {
  return (
    <EmptyState
      icon={icon}
      title={title}
      description={description}
      actionLabel={actionLabel}
      actionTo={actionTo}
    />
  );
}
