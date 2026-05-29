import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "GAME DATABASE",
    template: "%s"
  },
  description:
    "A structured database for slot game specs, hit rate, volatility, RTP, board size, and line mechanics.",
  keywords: [
    "game database",
    "slot game",
    "RTP",
    "hit rate",
    "max win",
    "volatility",
    "board size",
    "line mechanic",
    "game specs",
    "simulation data",
    "game analytics",
  ],
  openGraph: {
    title: "GAME DATABASE",
    description:
      "A structured slot game database built with Next.js.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
