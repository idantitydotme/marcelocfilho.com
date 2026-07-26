import { Hono } from "hono"
import authRoutes from "./routes/auth"
import emailPreviewRoutes from "./routes/email/preview"
import constructionGuestRoutes from "./routes/construction-guest"

const api = new Hono()

api.route("/auth", authRoutes)
api.route("/construction-guest", constructionGuestRoutes)
api.route("/email/preview", emailPreviewRoutes)

export default api
