import { Hono } from "hono"
import { actions, pages } from "astro/hono"
import api from "@/api"
import { i18n } from "./middleware/i18n"
import { security } from "./middleware/security"
import { auth } from "./middleware/auth"
import { construction } from "./middleware/construction"

const app = new Hono()

// 1. Localization & Routing
app.use(i18n)

// 2. Security Headers and SRI injection
app.use(security)

// 3. Global Auth Middleware
app.use(auth)

// 4. Global Construction Middleware
app.use(construction)

// 5. Register Hono API Sub-routing
app.route("/api", api)

// 6. Astro Lifecycle Execution (Actions and Page rendering)
app.use(actions())
app.use(pages())

export default app
