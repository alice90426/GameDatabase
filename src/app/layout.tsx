import type { Metadata } from "next";
import "./globals.css";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Javier Chiang | Game Math Model Designer",
    template: "%s"
  },
  description:
    "Portfolio of Javier Chiang, game math model designer: slot math design, RTP and volatility analysis, simulation validation, and GLI / BMM specification documents.",
  keywords: [
    "slot game math",
    "game math model",
    "slot math model",
    "RTP",
    "volatility",
    "hit rate",
    "simulation",
    "GLI",
    "BMM",
    "probability engineer",
    "老虎機數學模型"
  ],
  openGraph: {
    title: "Javier Chiang | Game Math Model Designer",
    description:
      "Slot and game math model design, RTP and volatility analysis, simulation validation, and certification-ready specifications.",
    type: "website"
  },
  verification: {
    google: "jXNW1CBLLk_G2BeLYIEBL12ELoSVzJARd2xuTdnF5vc"
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
