import { createFileRoute } from "@tanstack/react-router";

import { Block, PageShell } from "@/components/layout/PageShell";

const TITLE = "Refund Policy | Bhopali Mitra";
const DESCRIPTION = "Bhopali Mitra projects are free today. Read how refunds would work if paid projects are introduced in future.";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "/refund-policy" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell eyebrow="Legal" title="Refund Policy" intro="All projects on Bhopali Mitra are currently free, so no payments are collected.">
      <Block heading={"Current status"}>
        <p>Every project listed today is free. There are no charges, subscriptions or hidden fees, and therefore nothing to refund.</p>
      </Block>
      <Block heading={"If paid projects are introduced"}>
        <p>Should paid projects launch in future, digital products will generally be non-refundable once the download has been accessed, because the file cannot be returned.</p>
      </Block>
      <Block heading={"Failed delivery"}>
        <p>If a paid download ever fails and we cannot fix it, we will refund that purchase in full. Contact hello@bhopalimitra.com with your grab code.</p>
      </Block>
    </PageShell>
  );
}
