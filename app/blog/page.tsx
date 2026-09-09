import Link from "next/link";
import type { Metadata } from "next";

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
  },
  {
    slug: "best-free-background-removers-2026",
    title: "Best Free Background Removers in 2026 (Compared)",
    excerpt:
      "A look at the free tools available for removing backgrounds from photos, and what makes each one different.",
  },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-teal hover:underline">
          ← Back to BGCut
        </Link>
        <h1 className="font-display text-3xl mt-4 mb-8 text-ink">Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <h2 className="font-display text-xl text-ink group-hover:text-teal transition-colors">
                {post.title}
              </h2>
              <p className="text-inkSoft mt-1 leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
