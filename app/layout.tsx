import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://yourbgcut.vercel.app"),
  title: "Free Background Remover — Remove Image Background Instantly | BGCut",
  description:
    "Remove the background from any photo in seconds, free, no signup. Runs entirely in your browser — nothing is uploaded to a server. Download as transparent PNG.",
  keywords: [
    "background remover",
    "remove background from image",
    "free background remover",
    "transparent background maker",
    "remove bg online free",
    "image background eraser",
  ],
  openGraph: {
    title: "Free Background Remover — Instant, Private, No Signup",
    description:
      "Remove backgrounds from photos in seconds. 100% free and processed in your browser.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Background Remover — Instant, Private, No Signup",
    description:
      "Remove backgrounds from photos in seconds. 100% free and processed in your browser.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "GwOndkKHNQezvi4J0wVauPe2pyBCbY57xA3VwIFhsT0",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          src="https://pl31239782.profitableratecpmnetwork.com/e6/4c/a3/e64ca31462cdd91c897f8763892b964e.js"
          async
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "BGCut",
              applicationCategory: "PhotographyApplication",
              operatingSystem: "Any (runs in browser)",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "Free background remover that runs entirely in your browser. No signup, no upload to server, processes images on-device.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is this actually free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. There's no limit on how many images you can process, and no watermark on the result.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where does the processing happen?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Entirely in your browser, using a small on-device model. Your image is never sent to a server.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What file formats are supported?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can upload JPG, PNG, or WebP. The result always downloads as a transparent PNG.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there a limit on image size?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No hard limit, but very large images (4000x4000 pixels or more) may process slowly since everything runs on your device instead of a server.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does this work on mobile phones?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, BGCut works on any modern browser, including mobile Chrome and Safari. Processing time may be slightly longer on older phones.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use the result for commercial projects?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, the processed images are yours to use however you like, including commercial and business purposes.",
                  },
                },
              ],
            }),
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W25FK72J');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="font-body bg-cream text-ink antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W25FK72J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
