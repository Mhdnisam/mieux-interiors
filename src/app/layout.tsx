import type { Metadata } from "next";
import { Playfair_Display, Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ConfigProvider, App as AntApp } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AntdClientProvider from "@/components/AntdClientProvider";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mieuxinteriors.com"),
  title: "Mieux Interiors & Architects | Architectural Designer | Kallachi",
  description: "Mieux Interiors & Architects: Trusted design studio in Kallachi. 🏡 Residential | 🏢 Commercial. Quality. Creativity. Perfection.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Mieux Interiors & Architects | Architectural Designer | Kallachi",
    description: "Mieux Interiors & Architects: Trusted design studio in Kallachi. 🏡 Residential | 🏢 Commercial. Quality. Creativity. Perfection.",
    url: "https://www.mieuxinteriors.com",
    siteName: "Mieux Interiors",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Mieux Interiors & Architects Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mieux Interiors & Architects | Architectural Designer | Kallachi",
    description: "Mieux Interiors & Architects: Trusted design studio in Kallachi. 🏡 Residential | 🏢 Commercial. Quality. Creativity. Perfection.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AntdRegistry>
          <AntdClientProvider>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#8a6a4a", // Bronze accent
                  colorInfo: "#8a6a4a",
                  borderRadius: 8,
                  fontFamily: "var(--font-outfit), var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                },
              }}
            >
              <AntApp style={{ minHeight: "100vh" }}>
                {children}
              </AntApp>
            </ConfigProvider>
          </AntdClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
