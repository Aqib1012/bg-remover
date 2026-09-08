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
      </head>
      <body className="font-body bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
