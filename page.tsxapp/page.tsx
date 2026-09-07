"use client";

import { useCallback, useRef, useState } from "react";

type Status = "idle" | "loading-model" | "processing" | "done" | "error";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [fileName, setFileName] = useState("image");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setStatus("loading-model");

    try {
      const { removeBackground } = await import("@imgly/background-removal");
      setStatus("processing");
      const blob = await removeBackground(file);
      const outUrl = URL.createObjectURL(blob);
      setResultUrl(outUrl);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(
        "Couldn't process that image. Try a smaller file or a different photo."
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
  };

  const download = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${fileName}-no-bg.png`;
    a.click();
  };

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal" />
            <span className="font-display text-lg tracking-tight">BGCut</span>
          </div>
          <p className="text-sm text-paper/50 hidden sm:block">
            Free · No signup · Processed on your device
          </p>
        </div>
      </header>

      {/* AD SLOT: top banner — paste AdSterra banner code here */}
      <div className="max-w-5xl mx-auto px-6 pt-6" id="ad-slot-top" />

      {/* Hero + Tool */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-16">
        <div className="max-w-2xl mb-8">
          <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] mb-4">
            Cut the background out of any photo,{" "}
            <em className="not-italic text-tealLight">right in your browser</em>.
          </h1>
          <p className="text-paper/60 text-lg leading-relaxed">
            Drop a photo below. Nothing gets uploaded to a server — the whole
            thing runs locally on your device, so it's private and instant.
          </p>
        </div>

        {/* Tool card */}
        <div className="grain rounded-2xl border border-white/10 bg-charcoal2 p-6 sm:p-8">
          {status === "idle" && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-colors duration-200 flex flex-col items-center justify-center text-center py-20 px-6 ${
                isDragging
                  ? "border-teal bg-teal/5"
                  : "border-white/15 hover:border-white/30"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileSelect}
              />
              <UploadIcon />
              <p className="mt-4 font-medium text-paper/90">
                Drag a photo here, or click to browse
              </p>
              <p className="mt-1.5 text-sm text-paper/40">
                JPG, PNG, or WebP · Processed entirely on your device
              </p>
            </div>
          )}

          {(status === "loading-model" || status === "processing") && (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/15 mb-5">
                {originalUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={originalUrl}
                    alt=""
                    className="w-full h-full object-cover opacity-40"
                  />
                )}
                <div className="absolute inset-x-0 h-1 bg-tealLight/80 scan-line shadow-[0_0_12px_2px_rgba(127,184,173,0.6)]" />
              </div>
              <p className="font-medium text-paper/90">
                {status === "loading-model"
                  ? "Loading the model — first time only, takes a moment"
                  : "Lifting the subject off the background…"}
              </p>
              <p className="mt-1.5 text-sm text-paper/40">
                This happens on your device, not on a server.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <p className="font-medium text-rust mb-2">{errorMsg}</p>
              <button
                onClick={reset}
                className="mt-3 px-5 py-2.5 rounded-lg bg-teal text-charcoal font-medium hover:bg-tealLight transition-colors"
              >
                Try another photo
              </button>
            </div>
          )}

          {status === "done" && originalUrl && resultUrl && (
            <div className="fade-up">
              <div
                className="checkerboard relative rounded-xl overflow-hidden select-none mx-auto"
                style={{ maxWidth: 560 }}
              >
                <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={originalUrl}
                    alt="Original"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resultUrl}
                      alt="Background removed"
                      className="absolute inset-0 h-full object-contain"
                      style={{ width: "100vw", maxWidth: 560 }}
                    />
                  </div>
                  <div
                    className="absolute inset-y-0 w-0.5 bg-paper/80"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-paper flex items-center justify-center text-charcoal text-xs">
                      ↔
                    </div>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                  aria-label="Compare original and result"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                <button
                  onClick={download}
                  className="px-6 py-3 rounded-lg bg-teal text-charcoal font-medium hover:bg-tealLight transition-colors w-full sm:w-auto"
                >
                  Download PNG
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-3 rounded-lg border border-white/15 text-paper/80 hover:bg-white/5 transition-colors w-full sm:w-auto"
                >
                  Try another photo
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AD SLOT: mid-page banner — paste AdSterra code here */}
      <div className="max-w-5xl mx-auto px-6" id="ad-slot-mid" />

      {/* Info / SEO content */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/10">
        <div className="grid sm:grid-cols-3 gap-8 mb-16">
          <Feature
            title="Private by design"
            body="Your photo never leaves your device. There's no server upload, so there's nothing to store or leak."
          />
          <Feature
            title="No account needed"
            body="No sign-up, no email, no watermark. Drop a photo and get a transparent PNG back."
          />
          <Feature
            title="Works on any photo"
            body="Portraits, products, pets, logos — the model handles most subjects without manual masking."
          />
        </div>

        <div className="max-w-2xl">
          <h2 className="font-display text-2xl mb-4">
            How to remove a background from a photo
          </h2>
          <ol className="space-y-3 text-paper/60 leading-relaxed list-decimal list-inside">
            <li>Drag your photo into the box above, or click to choose a file.</li>
            <li>
              Wait a few seconds while the tool identifies the subject and
              removes everything behind it.
            </li>
            <li>
              Drag the slider to compare before and after, then download the
              result as a transparent PNG.
            </li>
          </ol>
        </div>

        <div className="max-w-2xl mt-12">
          <h2 className="font-display text-2xl mb-4">Frequently asked questions</h2>
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
              a="You can upload JPG, PNG, or WebP. The result always downloads as a transparent PNG."
            />
          </div>
        </div>
      </section>

      {/* AD SLOT: bottom banner — paste AdSterra code here */}
      <div className="max-w-5xl mx-auto px-6 pb-6" id="ad-slot-bottom" />

      <footer className="border-t border-white/10 py-8">
        <div className="max-w-5xl mx-auto px-6 text-sm text-paper/40">
          BGCut — a free tool, built with a browser-based ML model. No images
          are stored or uploaded.
        </div>
      </footer>
    </main>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-medium text-paper/90 mb-1.5">{title}</h3>
      <p className="text-sm text-paper/50 leading-relaxed">{body}</p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <p className="font-medium text-paper/90 mb-1">{q}</p>
      <p className="text-sm text-paper/50 leading-relaxed">{a}</p>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-paper/40"
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
