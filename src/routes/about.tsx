import { createFileRoute } from "@tanstack/react-router";

import { Block, PageShell } from "@/components/layout/PageShell";

const TITLE = "About Bhopali Mitra — Interactive Digital Experience Discovery";
const DESCRIPTION = "Bhopali Mitra curates ready-made interactive digital experiences for birthdays, anniversaries, proposals, love and memories. Preview live, then grab free.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell eyebrow="About us" title="We make moments, not messages" intro="Bhopali Mitra is a discovery platform for beautiful interactive digital experiences — built in Bhopal, made for everyone who wants their wishes to feel like moments.">
      <Block heading={"What we do"}>
        <p>We curate ready-made interactive digital experiences for birthdays, anniversaries, proposals, love, memories and celebrations. You discover a project, preview the real thing, then grab it.</p>
        <p>We do not build custom projects to order, and we do not edit or host the experiences themselves. Every project you see is already finished and ready.</p>
      </Block>
      <Block heading={"How we are different"}>
        <p>Most download sites show you a screenshot and hope for the best. We let you open the actual live experience before you decide.</p>
        <p>Everything on Bhopali Mitra is free right now.</p>
      </Block>
      <Block heading={"Where to find us"}>
        <p>Most people find us through Instagram. Comment #GRABPROJECT on a post, then search the project name here.</p>
      </Block>
    </PageShell>
  );
}
