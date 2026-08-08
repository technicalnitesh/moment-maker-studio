import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Search, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/product/SearchDialog";
import { BRAND_NAME, NAV_LINKS } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "glass-strong border-b border-border py-2" : "border-b border-transparent py-3.5",
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="focus-ring flex min-w-0 items-center gap-2.5"
            aria-label={`${BRAND_NAME} home`}
          >
            <span className="bg-gradient-brand grid size-9 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-glow)]">
              <Sparkles className="size-4" aria-hidden />
            </span>
            <span className="font-display truncate text-base font-bold tracking-tight sm:text-lg">
              {BRAND_NAME}
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-1.5">
            <nav className="mr-2 hidden items-center gap-1 lg:flex" aria-label="Main">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-foreground bg-secondary/70" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="focus-ring rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Search projects"
              onClick={() => setSearchOpen(true)}
            >
              <Search aria-hidden />
            </Button>

            <Button variant="hero" size="pill" asChild className="hidden lg:inline-flex">
              <Link to="/projects">Explore Projects</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          aria-label="Mobile"
          className={cn(
            "glass-strong absolute inset-x-3 top-20 rounded-3xl p-4 transition-all duration-300",
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => (
              <li key={link.to} style={{ transitionDelay: `${i * 40}ms` }}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "bg-secondary/70 text-foreground" }}
                  className="focus-ring block rounded-2xl px-4 py-3 text-base font-semibold text-foreground transition-colors duration-200 hover:bg-secondary/60"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button variant="hero" size="xl" asChild className="mt-3 w-full">
            <Link to="/projects" onClick={() => setMenuOpen(false)}>
              Explore Projects
            </Link>
          </Button>
        </nav>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
