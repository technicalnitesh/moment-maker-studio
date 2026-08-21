import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getPosts, getCategoryBySlug } from "@/lib/blog";
import { PostCard } from "@/blog/components/PostCard";

export const Route = createFileRoute("/blog/category/$slug")({
  loader: async ({ params }) => {
    const category = await getCategoryBySlug(params.slug);
    if (!category) throw notFound();
    const posts = await getPosts({ category: params.slug });
    return { category, posts };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.category ? `${loaderData.category.name} — Bhopali Mitra Blog` : "Blog Category" },
      { name: "description", content: loaderData?.category?.description },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, posts } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/blog" className="hover:text-primary">Blog</Link>
        <span>/</span>
        <span className="text-foreground">Category</span>
      </nav>

      <header className="max-w-3xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
          {category.icon}
        </div>
        <h1 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
          {category.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {category.description}
        </p>
      </header>

      <section className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{posts.length} Articles found</h2>
        </div>
        
        {posts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center">
            <p className="text-lg text-muted-foreground">No articles found in this category yet.</p>
            <Link to="/blog" className="mt-4 inline-block text-primary font-medium hover:underline">
              Browse all stories
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
