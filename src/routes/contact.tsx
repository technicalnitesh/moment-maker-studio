import { createFileRoute } from "@tanstack/react-router";

import { Block, PageShell } from "@/components/layout/PageShell";

const TITLE = "Contact Bhopali Mitra";
const DESCRIPTION = "Get in touch with the Bhopali Mitra team by email or Instagram for support, feedback or project requests.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell eyebrow="Contact us" title="Say hello" intro="Questions, feedback, collaborations or a project request — we read everything.">
      <Block heading={"Email"}>
        <p>Write to hello@bhopalimitra.com and we usually reply within two working days.</p>
      </Block>
      <Block heading={"Instagram"}>
        <p>The fastest way to reach us is a DM on Instagram @bhopalimitra.</p>
      </Block>
      <Block heading={"Where we are"}>
        <p>Bhopal, Madhya Pradesh, India.</p>
      </Block>
      <Block heading={"Reporting a broken project"}>
        <p>If a live preview or download is not working, send us the project name and your grab code and we will fix it.</p>
      </Block>
    </PageShell>
  );
}
