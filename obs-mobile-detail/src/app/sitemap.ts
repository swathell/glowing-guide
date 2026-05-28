import { MetadataRoute } from "next";
import { serviceAreas } from "@/data/areas";
import { serviceCategories } from "@/data/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/service-areas", "/gallery", "/reviews", "/faq", "/blog", "/contact", "/about", "/book"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date()
    })),
    ...serviceCategories.map((category) => ({
      url: `${siteConfig.url}/services/${category.slug}`,
      lastModified: new Date()
    })),
    ...serviceAreas.map((area) => ({
      url: `${siteConfig.url}/service-areas/${area.slug}`,
      lastModified: new Date()
    }))
  ];
}
