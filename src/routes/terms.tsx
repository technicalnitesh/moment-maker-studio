import { createFileRoute } from "@tanstack/react-router";

import { Block, PageShell } from "@/components/layout/PageShell";

const TITLE = "Terms & Conditions | Bhopali Mitra";
const DESCRIPTION = "The terms that apply when you browse, preview, grab and download interactive digital experiences from Bhopali Mitra.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell eyebrow="Legal" title="Terms & Conditions" intro="By using Bhopali Mitra you agree to these terms.">
      <Block heading={"Use of the platform"}>
        <p>Bhopali Mitra is a discovery platform. We showcase interactive digital experiences and link to their existing live previews and downloads. We do not generate, customise or host the experiences themselves.</p>
      </Block>
      <Block heading={"Licence"}>
        <p>Projects are provided for personal use. You may not resell, redistribute or claim authorship of a project without written permission.</p>
      </Block>
      <Block heading={"Availability"}>
        <p>Projects, previews and downloads may change or be removed at any time. Free access today does not guarantee free access in future.</p>
      </Block>
      <Block heading={"Liability"}>
        <p>We provide the platform as is and are not liable for issues arising from third-party previews, downloads or hosting services.</p>
      </Block>
    </PageShell>
  );
}
