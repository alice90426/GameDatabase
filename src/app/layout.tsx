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
  },
  verification: {
    google: 'jXNW1CBLLk_G2BeLYIEBL12ELoSVzJARd2xuTdnF5vc',
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="zh-Hant">
      <head>
        {gaId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
