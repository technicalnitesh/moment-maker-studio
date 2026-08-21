import { createFileRoute, Link } from "@tanstack/react-router";
import { getPosts } from "@/lib/blog";
import { PostCard } from "@/blog/components/PostCard";

export const Route = createFileRoute("/blog/tag/$slug")({
  loader: async ({ params }) => {
    const posts = await getPosts({ tag: params.slug });
    return { tag: params.slug, posts };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Articles tagged #${loaderData?.tag} — Bhopali Mitra Blog` },
    ],
  }),
  component: TagPage,
});

function TagPage() {
  const { tag, posts } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/blog" className="hover:text-primary">Blog</Link>
        <span>/</span>
        <span className="text-foreground">Tag</span>
      </nav>

      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
          #{tag}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Showing all articles tagged with #{tag}
        </p>
      </header>

      <section className="mt-16">
        <h2 className="text-xl font-bold">{posts.length} Articles found</h2>
        
        {posts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center">
            <p className="text-lg text-muted-foreground">No articles found with this tag.</p>
            <Link to="/blog" className="mt-4 inline-block text-primary font-medium hover:underline">
              Browse all stories
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
