import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Bundled locally (OFL). The site never depends on a remote font request.
const silkscreen = localFont({
  variable: "--font-silkscreen",
  display: "swap",
  src: [
    { path: "./fonts/silkscreen-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/silkscreen-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

// Used from the reveal scene onward. preload:false keeps the first paint lean and avoids
// "preloaded but not used" warnings; a hidden warm-up element in the boot scene fetches them.
const caveat = localFont({
  variable: "--font-caveat",
  display: "swap",
  preload: false,
  src: [{ path: "./fonts/caveat-latin-600-normal.woff2", weight: "600", style: "normal" }],
});

const courierPrime = localFont({
  variable: "--font-courier-prime",
  display: "swap",
  preload: false,
  src: [
    { path: "./fonts/courier-prime-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/courier-prime-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "a little birthday thing",
  description: "a small birthday surprise.",
  // Discourages indexing only. This is not access control.
  robots: { index: false, follow: false, nocache: true },
  openGraph: null,
  twitter: null,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8f1f1",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${silkscreen.variable} ${caveat.variable} ${courierPrime.variable}`}>
      <body>{children}</body>
    </html>
  );
}
