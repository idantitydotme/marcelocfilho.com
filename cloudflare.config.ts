import { bindings, defineConfig, type InferEnv } from "cf/config"

const config = defineConfig({
  worker: {
    name: "marcelocfilho-dot-com",
    compatibilityDate: "2026-08-27",
    entrypoint: "./src/fetch.ts",
    cache: {
      enabled: true
    },
    observability: {
      enabled: true,
      logs: {
        enabled: true,
        headSamplingRate: 1,
        invocationLogs: true
      },
      traces: {
        enabled: true
      }
    },
    env: {
      "CONSTRUCTION_MODE": bindings.text("true"),
      "DB": bindings.d1({
        name: "marcelocfilho-dot-com",
        id: "0f7abeb7-7943-4916-8975-a5284bdff812",
        dev: {
          remote: true
        }
      }),
      "marcelocfilho-dot-com_translations": bindings.kv({
        id: "c06d6e52f8d840ac976783a7a6f7ef4a",
        dev: {
          remote: true
        }
      }),
      "BLOB": bindings.r2({
        name: "marcelocfilho-dot-com",
        dev: {
          remote: true
        }
      }),
      "MY_RATE_LIMITER": bindings.rateLimit({
        namespace: "1001",
        simple: {
          limit: 100,
          period: 60
        }
      }),
      "ASSETS": bindings.assets(),
      "TURNSTILE_SITE_KEY": bindings.secret(),
      "TURNSTILE_SECRET_KEY": bindings.secret(),
      "CONSTRUCTION_PASSPHRASE": bindings.secret()
    }
  }
})

export type Env = InferEnv<typeof config>
export default config
