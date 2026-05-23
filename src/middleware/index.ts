import { sequence } from "astro:middleware"
import { security } from "@rimelight/ui/middleware"
import { construction } from "@/middleware/construction"

export const onRequest = sequence(security, construction)
