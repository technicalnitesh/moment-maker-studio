import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { format } from "date-fns";
import { PostCard } from "@/blog/components/PostCard";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug);
    if (!post) throw notFound();
    const related = await getRelatedPosts(post);
    return { post, related };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.post ? `${loaderData.post.title} | Bhopali Mitra Blog` : "Blog Post" },
      { name: "description", content: loaderData?.post?.excerpt },
      { property: "og:title", content: loaderData?.post?.title },
      { property: "og:description", content: loaderData?.post?.excerpt },
      { property: "og:image", content: loaderData?.post?.featuredImage },
      { property: "og:type", content: "article" },
    ],
  }),
  component: PostDetail,
});

function PostDetail() {
  const { post, related } = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/blog" className="hover:text-primary">Blog</Link>
        <span>/</span>
        <Link to="/blog/category/$slug" params={{ slug: post.category }} className="hover:text-primary capitalize">
          {post.category}
        </Link>
      </nav>

      <header className="text-center">
        <div className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wider text-primary">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.readingTime} read</span>
        </div>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 text-sm">
          <div className="font-medium text-foreground">{post.author.name}</div>
          <div className="text-muted-foreground">
            {format(new Date(post.publishedAt), "MMMM d, yyyy")}
          </div>
        </div>
      </header>

      <div className="mt-12 aspect-[21/9] w-full overflow-hidden rounded-3xl">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div 
        className="prose prose-invert prose-primary mx-auto mt-16 max-w-none text-lg leading-relaxed text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-16 flex flex-wrap gap-2 pt-8 border-t border-border">
        {post.tags.map(tag => (
          <Link
            key={tag}
            to="/blog/tag/$slug"
            params={{ slug: tag }}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-24 pt-16 border-t border-border">
          <h2 className="text-3xl font-bold">Related Stories</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-20 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card px-8 py-3 font-semibold transition-colors hover:border-primary/50"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
