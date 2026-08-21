import { Link } from "@tanstack/react-router";
import { BlogPost } from "@/blog/types/blog";
import { format } from "date-fns";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block h-full overflow-hidden rounded-2xl bg-card border border-border transition-all hover:border-primary/50">
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          {post.category}
        </div>
        <h3 className="mt-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
          <span>{post.readingTime} read</span>
        </div>
      </div>
    </Link>
  );
}
