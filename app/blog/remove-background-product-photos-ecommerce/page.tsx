import Link from "next/link";
import type { Metadata } from "next";
import Logo from "../../Logo";

export const metadata: Metadata = {
  title: "How to Remove Background from Product Photos for E-commerce | BGCut",
  description:
    "A step-by-step guide to creating clean, professional product photos with transparent backgrounds for your online store, free and without design software.",
};

export default function Post() {
  return (
    <main className="min-h-screen relative">
      <div className="blob-field">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
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
              href="/blog"
              className="text-sm font-medium text-teal hover:underline"
            >
              ← All articles
            </Link>
          </div>
        </header>

        <article className="max-w-2xl mx-auto px-6 py-16">
          <p className="text-xs text-inkSoft mb-3">4 min read</p>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-8 text-ink">
            How to Remove Background from Product Photos for E-commerce
          </h1>
          <div className="space-y-5 text-inkSoft leading-relaxed">
            <p>
              Clean product photos are one of the biggest factors in whether
              a shopper trusts your store enough to buy. A busy or
              inconsistent background makes a listing look unprofessional,
              even if the product itself is great. The fix is simple:
              remove the background and place your product on a plain white
              or transparent canvas.
            </p>
            <h2 className="font-display text-xl text-ink pt-4">
              Why transparent backgrounds matter for online stores
            </h2>
            <p>
              Marketplaces like Amazon, Etsy, and Shopify themes often
              expect product images with white or transparent backgrounds.
              It keeps your catalog visually consistent and lets your theme
              control the surrounding layout instead of fighting with a
              photo's original background.
            </p>
            <h2 className="font-display text-xl text-ink pt-4">
              Steps to remove the background from a product photo
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Take the photo against a reasonably plain surface if
                possible, it makes the cutout cleaner.
              </li>
              <li>
                Upload it to a background remover like{" "}
                <Link href="/" className="text-teal hover:underline">
                  BGCut
                </Link>{" "}
                — it processes the image in your browser, so there is no
                upload limit and no watermark.
              </li>
              <li>
                Download the result as a transparent PNG and place it on
                white or your store's brand background using your
                e-commerce platform's image editor.
              </li>
            </ol>
            <h2 className="font-display text-xl text-ink pt-4">
              A quick note on quality
            </h2>
            <p>
              For product photos, good lighting matters more than the tool
              you use to remove the background. A well-lit photo with clear
              edges around the product will always cut out more cleanly
              than a dim or blurry one.
            </p>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-tealSoft border border-teal/20">
            <p className="font-display text-lg text-ink mb-2">
              Try it on your own product photos
            </p>
            <p className="text-inkSoft text-sm mb-4">
              Free, no signup, and it runs entirely in your browser.
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2.5 rounded-lg bg-teal text-white font-medium hover:bg-tealDeep transition-colors"
            >
              Open BGCut
            </Link>
          </div>
        </article>

        <footer className="border-t border-border py-8">
          <div className="max-w-5xl mx-auto px-6 text-sm text-inkSoft">
            BGCut, a free tool built with a browser-based ML model.
          </div>
        </footer>
      </div>
    </main>
  );
}
