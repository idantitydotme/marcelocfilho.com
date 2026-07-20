import { drizzle } from "drizzle-orm/d1"
import type { DrizzleD1Database } from "drizzle-orm/d1"
import * as schema from "@/db/schema"

export * from "@/db/schema"
export { schema }

function anyObject(): any {
  return {}
}

function createDbProxy(): DrizzleD1Database<typeof schema> {
  let cachedDb: DrizzleD1Database<typeof schema> | null = null
  return new Proxy(anyObject(), {
    get(_target, prop) {
      if (prop === "then") return undefined

      const d1Binding = globalThis.DB
      if (!d1Binding) {
        throw new Error("[db] DB binding is not set. Bind the D1 database to the environment.")
      }

      if (!cachedDb) {
        cachedDb = drizzle(d1Binding, { schema })
      }

      return Reflect.get(cachedDb, prop)
    }
  })
}

export const db = createDbProxy()
