import type { MetadataRoute } from "next";

const BASE_URL = "https://evectussolutions.co.zw";

/** Every indexable route on the site. `/privacy` is being added by a parallel
 *  workstream; it is listed here so the sitemap is complete when it lands. */
const ROUTES: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/products", priority: 0.8 },
  { path: "/solutions", priority: 0.8 },
  { path: "/solutions/digital-transformation", priority: 0.7 },
  { path: "/solutions/strategic-consulting", priority: 0.7 },
  { path: "/solutions/technology-development", priority: 0.7 },
  { path: "/solutions/operational-excellence", priority: 0.7 },
  { path: "/process", priority: 0.6 },
  { path: "/case-studies", priority: 0.8 },
  { path: "/african-agenda", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${BASE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
