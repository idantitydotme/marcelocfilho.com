import type { SiteConfig } from "@rimelight/seo"

export const siteConfig: SiteConfig = {
  id: "marcelocfilho.com",
  name: "Marcelo Caldart Filho",
  description: "Sound Designer & Musician",
  url: "https://marcelocfilho.com",
  author: "Marcelo Caldart Filho",
  email: "marcelocfilho96@gmail.com",
  branding: {
    logo: {
      alt: "Marcelo Caldart Filho"
    },
    colors: {
      themeColor: "#0ea5e9",
      backgroundColor: "#000000"
    }
  },
  seo: {
    titleTemplate: "%s | Marcelo Caldart Filho",
    maxDescriptionLength: 160
  }
}
