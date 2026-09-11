"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import NativeBanner from "./NativeBanner";
import Logo from "./Logo";

type Status = "idle" | "loading-model" | "processing" | "done" | "error";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [fileName, setFileName] = useState("image");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const modelReady = useRef(false);

  useEffect(() => {
    import("@imgly/background-removal").then(() => {
      modelReady.current = true;
    });
  }, []);

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setStatus("error");
      setErrorMsg("That's not an image file. Try a JPG, PNG, or WebP.");
      return;
    }

    setFileName(file.name.replace(/\.[^/.]+$/, ""));

    const localUrl = URL.createObjectURL(file);

    setOriginalUrl(localUrl);
    setResultUrl(null);
    setErrorMsg("");
    setProgress(0);

    setStatus(
      modelReady.current ? "processing" : "loading-model"
    );

    try {
      const { removeBackground } = await import(
        "@imgly/background-removal"
      );

      modelReady.current = true;
      setStatus("processing");

      // ORIGINAL FILE DIRECTLY PROCESS HOGI
      // KOI MAX DIMENSION / RESIZE LIMIT NAHI
      const blob = await removeBackground(file, {
        publicPath:
          "https://staticimgly.com/@imgly/background-removal-data/1.6.0/dist/",
        model: "isnet_quint8",
        device: "gpu",
        output: {
          quality: 0.7,
          format: "image/webp",
        },
        progress: (key, current, total) => {
          if (total > 0) {
            const pct = Math.round(
              (current / total) * 100
            );
            setProgress(pct);
          }
        },
      });

      const outUrl = URL.createObjectURL(blob);

      setResultUrl(outUrl);
      setStatus("done");
    } catch (err) {
      console.error(err);

      setStatus("error");
      setErrorMsg(
        "Couldn't process that image. Try a different image or a device with more available memory."
      );
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];

      if (file) processFile(file);
    },
    [processFile]
  );

  const onFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) processFile(file);
    },
    [processFile]
  );

  const reset = () => {
    setStatus("idle");
    setOriginalUrl(null);
    setResultUrl(null);
    setErrorMsg("");
    setProgress(0);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const download = () => {
    if (!resultUrl) return;

    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${fileName}-no-bg.webp`;
    a.click();
  };

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
            <div className="flex items-center gap-2.5">
              <div className="pulse-ring rounded-lg">
                <Logo />
              </div>

              <span className="font-display text-lg tracking-tight text-ink">
                BGCut
              </span>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-sm text-inkSoft hidden sm:block">
                Free, no signup, processed on your device
              </p>

              <Link
                href="/blog"
                className="text-sm font-medium text-teal hover:underline"
              >
                Blog
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 pt-2" id="ad-slot-top" />

        <section className="max-w-5xl mx-auto px-6 pt-4 pb-16">
          <div className="max-w-2xl mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-tealSoft text-tealDeep text-xs font-medium mb-2">
              100% free, forever
            </span>

            <h1 className="font-display text-2xl sm:text-3xl leading-[1.15] mb-2 text-ink">
              Cut the background out of any photo,{" "}
              <span className="text-teal">
                right in your browser
              </span>
              .
            </h1>

            <p className="text-inkSoft text-sm leading-relaxed">
              Drop a photo below. Nothing gets uploaded to a server, the
              whole thing runs locally on your device, so it is private and
              instant.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl shadow-teal/5">
            {status === "idle" && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center text-center py-9 px-6 ${
                  isDragging
                    ? "border-teal bg-tealSoft scale-[1.01]"
                    : "border-border hover:border-teal/50 hover:bg-tealSoft/40"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onFileSelect}
                />

                <div className="bounce-soft">
                  <UploadIcon />
                </div>

                <p className="mt-3 font-medium text-ink text-lg">
                  Drag a photo here, or click to browse
                </p>

                <p className="mt-1 text-sm text-inkSoft">
                  JPG, PNG, or WebP, processed entirely on your device
                </p>
              </div>
            )}

            {(status === "loading-model" || status === "processing") && (
              <div className="py-16 flex flex-col items-center justify-center text-center pop-in">
                <div className="relative w-20 h-20 mb-6">
                  {originalUrl && (
                    <img
                      src={originalUrl}
                      alt=""
                      className="w-full h-full object-cover opacity-30 rounded-2xl"
                    />
                  )}

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="spin-slow w-12 h-12">
                      <ScissorsIcon />
                    </div>
                  </div>
                </div>

                <p className="font-semibold text-ink text-lg">
                  {status === "loading-model"
                    ? "Loading the model, first time only"
                    : "Lifting the subject off the background"}
                </p>

                <p className="mt-1.5 text-sm text-inkSoft mb-6">
                  This happens on your device, not on a server.
                </p>

                <div className="w-64 h-2 rounded-full bg-tealSoft overflow-hidden relative">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-teal transition-all duration-200"
                    style={{
                      width: `${Math.max(progress, 8)}%`,
                    }}
                  />
                </div>

                {progress > 0 && (
                  <p className="text-xs text-inkSoft mt-2">
                    {progress}%
                  </p>
                )}
              </div>
            )}

            {status === "error" && (
              <div className="py-16 flex flex-col items-center justify-center text-center pop-in">
                <div className="w-14 h-14 rounded-full bg-coralSoft flex items-center justify-center mb-4">
                  <span className="text-2xl">!</span>
                </div>

                <p className="font-medium text-ink mb-2">
                  {errorMsg}
                </p>

                <button
                  onClick={reset}
                  className="mt-3 px-5 py-2.5 rounded-lg bg-teal text-white font-medium hover:bg-tealDeep transition-colors"
                >
                  Try another photo
                </button>
              </div>
            )}

            {status === "done" && originalUrl && resultUrl && (
              <div className="pop-in">
                <div
                  className="checkerboard relative rounded-xl overflow-hidden select-none mx-auto border border-border"
                  style={{ maxWidth: 560 }}
                >
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <img
                      src={resultUrl}
                      alt="Background removed"
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{
                        clipPath: `inset(0 ${
                          100 - sliderPos
                        }% 0 0)`,
                      }}
                    />

                    <img
                      src={originalUrl}
                      alt="Original"
                      className="absolute inset-0 w-full h-full object-contain"
                      style={{
                        clipPath: `inset(0 0 0 ${sliderPos}%)`,
                      }}
                    />

                    <div
                      className="absolute inset-y-0 w-0.5 bg-white shadow-lg"
                      style={{
                        left: `${sliderPos}%`,
                      }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-teal text-sm font-bold">
                        ↔
                      </div>
                    </div>

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-xs font-medium text-teal shadow">
                      After
                    </span>

                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 text-xs font-medium text-inkSoft shadow">
                      Before
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderPos}
                    onChange={(e) =>
                      setSliderPos(Number(e.target.value))
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                    aria-label="Compare original and result"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                  <button
                    onClick={download}
                    className="px-6 py-3 rounded-lg bg-teal text-white font-medium hover:bg-tealDeep hover:-translate-y-0.5 transition-all shadow-md shadow-teal/20 w-full sm:w-auto"
                  >
                    Download PNG
                  </button>

                  <button
                    onClick={reset}
                    className="px-6 py-3 rounded-lg border border-border text-ink hover:bg-tealSoft/50 transition-colors w-full sm:w-auto"
                  >
                    Try another photo
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6">
          <NativeBanner />
        </div>

        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-border">
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            <Feature
              icon="🔒"
              title="Private by design"
              body="Your photo never leaves your device. There's no server upload, so there's nothing to store or leak."
            />

            <Feature
              icon="⚡"
              title="No account needed"
              body="No sign-up, no email, no watermark. Drop a photo and get a transparent PNG back."
            />

            <Feature
              icon="✨"
              title="Works on any photo"
              body="Portraits, products, pets, logos, the model handles most subjects without manual masking."
            />
          </div>

          <div className="max-w-2xl">
            <h2 className="font-display text-2xl mb-4 text-ink">
              How to remove a background from a photo
            </h2>

            <ol className="space-y-3 text-inkSoft leading-relaxed list-decimal list-inside">
              <li>
                Drag your photo into the box above, or click to choose a file.
              </li>

              <li>
                Wait a few seconds while the tool identifies the subject and
                removes everything behind it.
              </li>

              <li>
                Drag the slider to compare before and after, then download the
                result as a transparent image.
              </li>
            </ol>
          </div>

          <div className="max-w-2xl mt-12">
            <h2 className="font-display text-2xl mb-4 text-ink">
              Frequently asked questions
            </h2>

            <div className="space-y-6">
              <FAQ
                q="Is this actually free?"
                a="Yes. There's no limit on how many images you can process, and no watermark on the result."
              />

              <FAQ
                q="Where does the processing happen?"
                a="Entirely in your browser, using a small on-device model. Your image is never sent to a server."
              />

              <FAQ
                q="What file formats are supported?"
                a="You can upload JPG, PNG, or WebP."
              />

              <FAQ
                q="Is there a limit on image size?"
                a="There is no application-level size or dimension limit. Very large images may require more device memory and processing power."
              />

              <FAQ
                q="Does this work on mobile phones?"
                a="Yes, BGCut works on any modern browser, including mobile Chrome and Safari. Processing time may be slightly longer on older phones."
              />

              <FAQ
                q="Can I use the result for commercial projects?"
                a="Yes, the processed images are yours to use however you like, including commercial and business purposes."
              />
            </div>
          </div>
        </section>

        <div
          className="max-w-5xl mx-auto px-6 pb-6"
          id="ad-slot-bottom"
        />

        <footer className="border-t border-border py-8">
          <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-inkSoft">
            <p>
              BGCut, a free tool built with a browser-based ML model. No
              images are stored or uploaded.
            </p>

            <Link
              href="/blog"
              className="text-teal hover:underline whitespace-nowrap"
            >
              Read our blog →
            </Link>
          </div>

          <div className="max-w-5xl mx-auto px-6 mt-6">
            <a
              href="https://www.producthunt.com/products/bgcut/reviews/new?utm_source=badge-product_review&utm_medium=badge&utm_source=badge-bgcut"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=1312515&theme=light"
                alt="BGCut - Free background remover that runs 100% in your browser | Product Hunt"
                style={{ width: 250, height: 54 }}
                width={250}
                height={54}
              />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="p-5 rounded-xl bg-card border border-border hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="text-2xl mb-2">{icon}</div>

      <h3 className="font-medium text-ink mb-1.5">
        {title}
      </h3>

      <p className="text-sm text-inkSoft leading-relaxed">
        {body}
      </p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <p className="font-medium text-ink mb-1">{q}</p>

      <p className="text-sm text-inkSoft leading-relaxed">
        {a}
      </p>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-teal"
    >
      <path
        d="M12 16V4M12 4L7 9M12 4l5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScissorsIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-teal"
    >
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />

      <path
        d="M8.5 7.5L19 18"
        strokeLinecap="round"
      />

      <path
        d="M8.5 16.5L19 6"
        strokeLinecap="round"
      />
    </svg>
  );
}
