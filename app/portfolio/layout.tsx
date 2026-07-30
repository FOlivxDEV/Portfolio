import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfólio | Studio X",
  description: "Explore projetos de websites premium por categoria e segmento.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
