import { MetadataRoute } from "next"

const SITE_URL = "https://poizonsng.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all AI search bots explicitly
      { userAgent: "GPTBot",        allow: "/" },
      { userAgent: "ChatGPT-User",  allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot",     allow: "/" },
      { userAgent: "anthropic-ai",  allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Bingbot",       allow: "/" },
      { userAgent: "Applebot",      allow: "/" },
      // Block training-only scrapers (not search/citation bots)
      { userAgent: "CCBot",         disallow: "/" },
      // Allow everyone else
      { userAgent: "*",             allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
