import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const title = "Studio X — Websites premium que elevam marcas";
const description = "Design e desenvolvimento de websites premium, rápidos e orientados a conversão para marcas que querem parecer gigantes.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://studio-x.example"),
  title, description, keywords: ["criação de sites", "web design premium", "Next.js", "landing page", "site institucional"],
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", locale: "pt_BR", siteName: "Studio X", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio X — Sites que fazem marcas parecerem gigantes." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07090D", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={roboto.variable}><body>{children}</body></html>;
}
