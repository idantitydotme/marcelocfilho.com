import type { SiteConfig } from "@rimelight/seo"

export const siteConfig: SiteConfig = {
  id: "marcelocfilho.com",
  name: "Marcelo C. Filho",
  description: "Welcome to my website!",
  url: "https://marcelocfilho.com",
  ogImage: "/og/placeholder.webp",
  author: "Marcelo C. Filho",
  email: "",
  branding: {
    logo: {
      alt: "Marcelo C. Filho"
    },
    favicon: {
      svg: "/favicon.svg"
    },
    colors: {
      themeColor: "#ffffff",
      backgroundColor: "#ffffff"
    }
  },
  seo: {
    titleTemplate: "%s | Marcelo C. Filho",
    ogImageFallback: "/og/placeholder.webp",
    maxDescriptionLength: 160
  }
}
