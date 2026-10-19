import { bindings, defineConfig, triggers } from "cf/config";

export default defineConfig({
  worker: {
    name: "marcelocfilho-dot-com",
    compatibilityDate: "2026-08-27",
    entrypoint: "./src/fetch.ts",
    cache: {
      enabled: true,
    },
    observability: {
      enabled: true,
      traces: {
        enabled: true,
      },
    },
    triggers: [
      triggers.fetch({ pattern: "marcelocfilho.com/*", zone: "marcelocfilho.com" }),
      triggers.fetch({ pattern: "www.marcelocfilho.com/*", zone: "marcelocfilho.com" }),
    ],
    env: {
      CONSTRUCTION_MODE: bindings.text("true"),
      EMAIL_DOMAIN: bindings.text("marcelocfilho.com"),
      CONTACT_OWNER_EMAIL: bindings.text("marcelocfilho96@gmail.com"),
      DB: bindings.d1({
        id: "0f7abeb7-7943-4916-8975-a5284bdff812",
        dev: {
          remote: true,
        },
      }),
      BLOB: bindings.r2({
        name: "marcelocfilho-dot-com",
        dev: {
          remote: true,
        },
      }),
      EMAIL: bindings.sendEmail({
        dev: {
          remote: true,
        },
      }),
      MY_RATE_LIMITER: bindings.rateLimit({
        namespace: "1001",
        simple: {
          limit: 100,
          period: 60,
        },
      }),
      ASSETS: bindings.assets(),
      CONSTRUCTION_PASSPHRASE: bindings.secret(),
    },
  },
});
