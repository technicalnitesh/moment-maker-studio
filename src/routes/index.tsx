import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { Hero } from "@/components/home/Hero";
import {
  CategorySection,
  FinalCta,
  HowItWorks,
  InstagramSection,
  WhySection,
} from "@/components/home/HomeSections";
import { FeaturedProduct } from "@/components/product/FeaturedProduct";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AdSlot } from "@/components/common/AdSlot";
import { Button } from "@/components/ui/button";
import { productsSync } from "@/lib/catalog";
import { BRAND_TAGLINE, DEFAULT_META_DESCRIPTION } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Bhopali Mitra — ${BRAND_TAGLINE}` },
      { name: "description", content: DEFAULT_META_DESCRIPTION },
      { property: "og:title", content: `Bhopali Mitra — ${BRAND_TAGLINE}` },
      { property: "og:description", content: DEFAULT_META_DESCRIPTION },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const all = productsSync();
  const featured = all.find((p) => p.is_featured) ?? all[0];
  const trending = all.filter((p) => p.is_trending).slice(0, 6);
  const fresh = all.filter((p) => p.is_new).slice(0, 3);

  return (
    <>
      <Hero />
      <InstagramSection />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="✨ Featured Surprise"
          title="Featured Experience"
          description="One experience we think deserves your attention right now."
          className="mb-8"
        />
        {featured ? <FeaturedProduct product={featured} /> : null}
      </section>

      <CategorySection />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="🔥 Trending now"
          title="What everyone is grabbing"
          action={
            <Button variant="soft" size="pill" asChild>
              <Link to="/trending">See all trending</Link>
            </Button>
          }
          className="mb-8"
        />
        <ProductGrid products={trending} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="✨ Freshly added"
          title="New experiences"
          action={
            <Button variant="soft" size="pill" asChild>
              <Link to="/projects">Browse all</Link>
            </Button>
          }
          className="mb-8"
        />
        <ProductGrid products={fresh} />
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSlot id="home-mid" />
      </div>

      <HowItWorks />
      <WhySection />
      <FinalCta />
    </>
  );
}
