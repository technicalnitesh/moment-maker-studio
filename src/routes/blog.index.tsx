import { createFileRoute } from "@tanstack/react-router";
import { getLatestPosts, getCategories } from "@/lib/blog";
import { PostCard } from "@/blog/components/PostCard";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const [posts, categories] = await Promise.all([
      getLatestPosts(10),
      getCategories(),
    ]);
    return { posts, categories };
  },
  head: () => ({
    meta: [
      { title: "Blog — Stories, Ideas & Inspiration | Bhopali Mitra" },
      { name: "description", content: "Discover creative ideas for birthdays, anniversaries, and digital surprises on the Bhopali Mitra blog." },
    ],
  }),
  component: BlogHome,
});

function BlogHome() {
  const { posts, categories } = Route.useLoaderData();
  const featuredPost = posts.find(p => p.isFeatured) || posts[0];
  const remainingPosts = posts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Stories & Ideas</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-6xl">
          Don't just send a wish. <span className="text-gradient">Create a moment.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Explore our collection of articles on digital surprises, creative gifting, and making every celebration unforgettable.
        </p>
      </header>

      {/* Categories */}
      <nav className="mt-12 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to="/blog/category/$slug"
            params={{ slug: cat.slug }}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </nav>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mt-16">
          <Link 
            to="/blog/$slug" 
            params={{ slug: featuredPost.slug }}
            className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-2"
          >
            <div className="aspect-[16/9] lg:aspect-auto">
              <img
                src={featuredPost.featuredImage}
                alt={featuredPost.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Featured Article • {featuredPost.category}
              </span>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <span>{featuredPost.author.name}</span>
                <span>•</span>
                <span>{featuredPost.readingTime} read</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Grid */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold">Latest Stories</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {remainingPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
