export const siteConfig = {
  name: "pgdev",
  url: "https://maishatu.com",
  ogImage: "https://maishatu.com/og.jpg",
  description: "Zero user website.",
  links: {
    twitter: "https://twitter.com/maishatu",
    github: "https://github.com/paulgsc",
    youtube: "https://www.youtube.com/@aulpgdev",
  },
} as const;

export type SiteConfig = typeof siteConfig;
