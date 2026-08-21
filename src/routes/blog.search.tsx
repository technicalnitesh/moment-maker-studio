import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { searchPosts } from "@/lib/blog";
import { PostCard } from "@/blog/components/PostCard";
import { useState, useEffect } from "react";
import { BlogPost } from "@/blog/types/blog";
import { Search } from "lucide-react";

export const Route = createFileRoute("/blog/search")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search['q'] as string) || "",
    };
  },
  head: () => ({
    meta: [{ title: "Search Results — Bhopali Mitra Blog" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const performSearch = async () => {
      if (!q) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      const posts = await searchPosts(q);
      setResults(posts);
      setIsSearching(false);
    };
    performSearch();
  }, [q]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    navigate({ to: "/blog/search", search: { q: query } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/blog" className="hover:text-primary">Blog</Link>
        <span>/</span>
        <span className="text-foreground">Search</span>
      </nav>

      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">Search</h1>
        <form onSubmit={handleSearch} className="mt-8 relative max-w-xl">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search stories, ideas, or categories..."
            className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-4 text-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </form>
      </header>

      <section className="mt-16">
        {q ? (
          <>
            <h2 className="text-xl font-bold">
              {isSearching ? "Searching..." : `${results.length} Results for "${q}"`}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {!isSearching && results.length === 0 && (
              <div className="mt-20 text-center">
                <p className="text-lg text-muted-foreground">We couldn't find anything matching your search.</p>
                <p className="mt-2 text-sm text-muted-foreground">Try different keywords or browse our categories.</p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-20 text-center">
            <p className="text-lg text-muted-foreground">Enter a search term above to find articles.</p>
          </div>
        )}
      </section>
    </div>
  );
}
