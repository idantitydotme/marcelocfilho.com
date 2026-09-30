import { defineConfig } from "vite-plus";
import { fileRoutes } from "filesystem-routing/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import solid from "@solidjs/vite-plugin";
import { ui } from "@rimelight/ui/plugin";
import { seo } from "@rimelight/seo/plugin";
import { security } from "@rimelight/security/plugin";
import { auth } from "@rimelight/auth/plugin";
import { i18n } from "@rimelight/i18n/plugin";
import en from "./src/i18n/en.json";
import pt from "./src/i18n/pt.json";

export default defineConfig({
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  plugins: [
    cloudflare({
      viteEnvironment: {
        name: "ssr",
      },
      experimental: {
        newConfig: true,
      },
    }),

    solid({
      start: {
        devtools: false,
      },
      ssr: true,
      extensions: [".jsx", ".tsx"],
    }),

    fileRoutes({ types: true }),

    ui({
      logos: {
        logomark: {
          color: "https://cdn.marcelocfilho.com/logos/logomark_color.svg",
          white: "https://cdn.marcelocfilho.com/logos/logomark_white.svg",
          black: "https://cdn.marcelocfilho.com/logos/logomark_black.svg",
        },
        logotype: {
          color: "https://cdn.marcelocfilho.com/logos/logotype_color.svg",
          white: "https://cdn.marcelocfilho.com/logos/logotype_white.svg",
          black: "https://cdn.marcelocfilho.com/logos/logotype_black.svg",
        },
      },
    }),

    seo({
      id: "marcelocfilho.com",
      url: "https://marcelocfilho.com",
      name: "Marcelo Caldart Filho",
      description: "Sound Designer & Musician",
      author: "Marcelo Caldart Filho",
      email: "marcelocfilho96@gmail.com",
      branding: {
        logo: { alt: "Marcelo Caldart Filho" },
        favicon: { svg: "https://cdn.marcelocfilho.com/logos/logomark_color.svg" },
        appleTouchIcon: "https://cdn.marcelocfilho.com/logos/logomark_color.svg",
        colors: { themeColor: "#0ea5e9", backgroundColor: "#000000" },
      },
      titleTemplate: "%s | Marcelo Caldart Filho",
      locales: { en: "en-US", pt: "pt-BR" },
      privatePathPrefixes: [
        "/dashboard",
        "/admin",
        "/cms",
        "/internal",
        "/api",
        "/dev",
        "/og",
        "/open-graph",
        "/auth",
        "/cdn-cgi",
      ],
    }),

    security({ domain: "marcelocfilho.com" }),

    auth(),

    i18n({
      locales: ["en", "pt"],
      defaultLocale: "en",
      translations: { en, pt },
    }),
  ],
});
