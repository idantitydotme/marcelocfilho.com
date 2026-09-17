import { defineConfig } from "astro/config"
import { rimelightAstroConfig } from "@rimelight/config/astro"

export default defineConfig(
  rimelightAstroConfig({
    domain: "marcelocfilho.com",
    seo: {
      name: "Marcelo Caldart Filho",
      description: "Sound Designer & Musician",
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
      titleTemplate: "%s | Marcelo Caldart Filho",
      locales: {
        en: "en-US",
        pt: "pt-BR"
      },
      privatePathPrefixes: [
        "/dashboard",
        "/admin",
        "/cms",
        "/internal",
        "/api",
        "/dev",
        "/og",
        "/open-graph",
        "/auth"
      ]
    },
    solid: true,
    cms: true,
    auth: true,
    security: true,
    i18n: {
      locales: ["en", "es"],
      defaultLocale: "en"
    },
    ui: true
  })
)
