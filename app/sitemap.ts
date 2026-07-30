import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://studio-x.example";
  return ["", "/portfolio", "/privacidade", "/cookies", "/termos", "/exclusao-de-dados"].map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path ? "yearly" : "monthly", priority: path === "/portfolio" ? .8 : path ? .3 : 1 }));
}
