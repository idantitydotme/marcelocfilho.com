import { bindings, defineConfig, triggers } from "cf/config";

export default defineConfig({
  worker: {
    name: "marcelocfilho-dot-com",
    compatibilityDate: "2026-10-01",
    entrypoint: "./src/fetch.ts",
    observability: {
      enabled: true,
      traces: {
        enabled: true,
      },
    },
    cache: {
      enabled: true,
    },
    triggers: [
      triggers.fetch({ pattern: "marcelocfilho.com/*", zone: "marcelocfilho.com" }),
      triggers.fetch({ pattern: "www.marcelocfilho.com/*", zone: "marcelocfilho.com" }),
    ],
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      BLOB: bindings.r2({
        name: "marcelocfilho-dot-com",
      }),
      DB: bindings.d1({
        id: "0f7abeb7-7943-4916-8975-a5284bdff812",
      }),
      EMAIL: bindings.sendEmail(),
      RATE_LIMIT: bindings.rateLimit({
        namespace: "1001",
        simple: {
          limit: 100,
          period: 60,
        },
      }),
      CONSTRUCTION_MODE: bindings.secret(),
      CONSTRUCTION_PASSPHRASE: bindings.secret(),
      CONTACT_OWNER_EMAIL: bindings.text("marcelocfilho96@gmail.com"),
    },
  },
});
