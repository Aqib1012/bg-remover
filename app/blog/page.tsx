import Link from "next/link";
import type { Metadata } from "next";
import Logo from "../Logo";

export const metadata: Metadata = {
  title: "Blog — BGCut",
  description: "Tips and guides on removing image backgrounds, e-commerce photos, and more.",
};

const posts = [
  {
    slug: "remove-background-product-photos-ecommerce",
    title: "How to Remove Background from Product Photos for E-commerce",
    excerpt:
      "A simple guide to getting clean, professional product photos with transparent backgrounds for your online store.",
    readTime: "4 min read",
  },
  {
    slug: "best-free-background-removers-2026",
    title: "Best Free Background Removers in 2026 (Compared)",
    excerpt:
      "A look at the free tools available for removing backgrounds from photos, and what makes each one different.",
    readTime: "5 min read",
  },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen relative">
      <div className="blob-field">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="relative z-10">
        <header className="border-b border-border/70 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-6 py-2.5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="pulse-ring rounded-lg">
                <Logo />
              </div>
              <span className="font-display text-lg tracking-tight text-ink">
                BGCut
              </span>
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-teal hover:underline"
            >
              ← Back to tool
            </Link>
          </div>
        </header>

        <section className="max-w-3xl mx-auto px-6 py-16">
          <span className="inline-block px-3 py-1 rounded-full bg-tealSoft text-tealDeep text-xs font-medium mb-3">
            Guides & notes
          </span>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-3 text-ink">
            The BGCut blog
          </h1>
          <p className="text-inkSoft leading-relaxed mb-12 max-w-xl">
            Short, practical write-ups on photo backgrounds, e-commerce
            images, and the tools we build.
          </p>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-border bg-card p-6 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5 hover:-translate-y-0.5 transition-all"
              >
                <p className="text-xs text-inkSoft mb-2">{post.readTime}</p>
                <h2 className="font-display text-xl text-ink group-hover:text-teal transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-inkSoft leading-relaxed text-sm">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-teal font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-border py-8">
          <div className="max-w-5xl mx-auto px-6 text-sm text-inkSoft">
            BGCut, a free tool built with a browser-based ML model.
          </div>
        </footer>
      </div>
    </main>
  );
}
