import { Hono } from "hono"
import authRoutes from "./routes/auth"
import searchRoutes from "./routes/search"
import changelogRoutes from "./routes/changelog"
import assetsRoutes from "./routes/assets"
import pagesRoutes from "./routes/pages"
import versionRoutes from "./routes/versions"
import emailPreviewRoutes from "./routes/email/preview"
import constructionGuestRoutes from "./routes/construction-guest"

const api = new Hono()

api.route("/auth", authRoutes)
api.route("/construction-guest", constructionGuestRoutes)
api.route("/search", searchRoutes)
api.route("/github", changelogRoutes)
api.route("/assets", assetsRoutes)
api.route("/pages", pagesRoutes)
api.route("/pages/versions", versionRoutes)
api.route("/email/preview", emailPreviewRoutes)

export default api
