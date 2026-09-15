import { defineConfig } from "astro/config"
import { rimelightAstroConfig } from "@rimelight/config/astro"

export default defineConfig(
  rimelightAstroConfig({
    domain: "marcelocfilho.com",
    solid: true,
    cms: true,
    security: true,
    i18n: true,
    ui: true
  })
)
