import { createFileRoute } from "@tanstack/react-router";

import { Block, PageShell } from "@/components/layout/PageShell";

const TITLE = "Cookie Policy | Bhopali Mitra";
const DESCRIPTION = "Details on the essential, analytics and advertising cookies used across Bhopali Mitra.";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/cookie-policy" },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell eyebrow="Legal" title="Cookie Policy" intro="How cookies and similar technologies are used on Bhopali Mitra.">
      <Block heading={"Essential cookies"}>
        <p>Some cookies are needed for the site to work correctly, such as remembering basic preferences during your visit.</p>
      </Block>
      <Block heading={"Analytics cookies"}>
        <p>We may use analytics cookies to count page views, previews and grabs so we know which experiences people love.</p>
      </Block>
      <Block heading={"Advertising cookies"}>
        <p>We are preparing for Google AdSense. When enabled, advertising partners may set cookies to show relevant ads.</p>
      </Block>
      <Block heading={"Managing cookies"}>
        <p>You can delete or block cookies in your browser settings. Some parts of the site may not work as smoothly if you do.</p>
      </Block>
    </PageShell>
  );
}
