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
  metadataBase: new URL("https://your-domain.vercel.app"),
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {/*
          ADSTERRA SETUP:
          1. Sign up at adsterra.com, add this site, get your ad codes.
          2. Paste your AdSterra <script> tags here in <head>, or right
             before </body>, exactly as AdSterra gives them to you.
          3. For banner ad units, drop the AdSterra <script> in the
             designated slots inside app/page.tsx (marked with comments).
        */}
      </head>
      <body className="font-body bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
