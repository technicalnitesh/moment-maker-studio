import { createFileRoute } from "@tanstack/react-router";

import { Block, PageShell } from "@/components/layout/PageShell";

const TITLE = "Privacy Policy | Bhopali Mitra";
const DESCRIPTION = "How Bhopali Mitra collects, uses and protects information when you browse, preview and grab digital experiences.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell eyebrow="Legal" title="Privacy Policy" intro="This policy explains what we collect when you use Bhopali Mitra and how we handle it.">
      <Block heading={"Information we collect"}>
        <p>We do not require an account to browse, preview or grab projects. We may collect anonymous usage data such as page views, preview clicks and grab clicks to understand which experiences are popular.</p>
        <p>If you contact us by email, we keep your message and email address only to reply.</p>
      </Block>
      <Block heading={"Cookies and analytics"}>
        <p>We may use cookies and third-party analytics or advertising services, including Google AdSense, which may set their own cookies. See our Cookie Policy for details.</p>
      </Block>
      <Block heading={"Third-party links"}>
        <p>Live previews and downloads are hosted on external services. Once you open them, the privacy policy of that service applies.</p>
      </Block>
      <Block heading={"Your choices"}>
        <p>You can block cookies in your browser at any time. To request deletion of any message you sent us, email hello@bhopalimitra.com.</p>
      </Block>
    </PageShell>
  );
}
