import { createFileRoute } from "@tanstack/react-router";

import { Block, PageShell } from "@/components/layout/PageShell";

const TITLE = "Disclaimer | Bhopali Mitra";
const DESCRIPTION = "Important disclaimers about third-party previews, downloads and the projects showcased on Bhopali Mitra.";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell eyebrow="Legal" title="Disclaimer" intro="Please read this carefully before using any project from Bhopali Mitra.">
      <Block heading={"Third-party content"}>
        <p>Preview and download links point to external services. We do not control their uptime, content or security and cannot guarantee availability.</p>
      </Block>
      <Block heading={"No warranty"}>
        <p>Projects are provided as is, without warranty of any kind. Test an experience before sharing it with someone important.</p>
      </Block>
      <Block heading={"Trademarks"}>
        <p>All brand names, emojis and trademarks referenced belong to their respective owners.</p>
      </Block>
    </PageShell>
  );
}
