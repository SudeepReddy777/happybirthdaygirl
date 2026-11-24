import type { MetadataRoute } from "next";

// Asks crawlers to stay away. It does not make the page private.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
