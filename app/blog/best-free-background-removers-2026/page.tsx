import Link from "next/link";
import type { Metadata } from "next";
import Logo from "../../Logo";

export const metadata: Metadata = {
  title: "Best Free Background Removers in 2026 (Compared) | BGCut",
  description:
    "A comparison of free background remover tools in 2026, covering privacy, speed, and ease of use.",
};

export default function Post() {
  return (
    <main className="min-h-screen relative">
      <div className="blob-field">
        <div className="blob blob-1" />
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
              href="/blog"
              className="text-sm font-medium text-teal hover:underline"
            >
              ← All articles
            </Link>
          </div>
        </header>

        <article className="max-w-2xl mx-auto px-6 py-16">
          <p className="text-xs text-inkSoft mb-3">5 min read</p>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-8 text-ink">
            Best Free Background Removers in 2026 (Compared)
          </h1>
          <div className="space-y-5 text-inkSoft leading-relaxed">
            <p>
              There are more background removal tools available now than
              ever, and most of them fall into one of two categories: tools
              that upload your photo to a server for processing, and tools
              that process the image locally in your browser. The
              difference matters more than people usually realize.
            </p>
            <h2 className="font-display text-xl text-ink pt-4">
              Server-based tools
            </h2>
            <p>
              Most well-known background removers send your photo to a
              remote server, run the model there, and send the result back.
              This is usually fast, but it means your image briefly leaves
              your device, and many of these tools cap the number of free
              images you can process per day or add a watermark unless you
              pay.
            </p>
            <h2 className="font-display text-xl text-ink pt-4">
              Browser-based tools
            </h2>
            <p>
              A newer approach runs the whole model inside your browser
              using WebAssembly or WebGPU. The tradeoff is that the first
              image takes a little longer while the model loads, but after
              that nothing is uploaded anywhere, there is no daily limit,
              and there's no server cost, so these tools tend to stay free.{" "}
              <Link href="/" className="text-teal hover:underline">
                BGCut
              </Link>{" "}
              works this way.
            </p>
            <h2 className="font-display text-xl text-ink pt-4">
              What to look for
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>No daily limit on how many images you can process</li>
              <li>No watermark on the downloaded result</li>
              <li>Clear information about where your image is processed</li>
              <li>Fast enough for everyday use on normal photo sizes</li>
            </ul>
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-tealSoft border border-teal/20">
            <p className="font-display text-lg text-ink mb-2">
              Try a browser-based background remover
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
