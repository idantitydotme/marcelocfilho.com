import type { Component } from "solid-js"
import AppLayout from "#layouts/AppLayout"
import { RLContainer, RLButton } from "@rimelight/ui"
import { t, getRelativeLocaleUrl } from "@rimelight/i18n"

export const AboutPage: Component = () => {
  return (
    <AppLayout title={t("page_about.title")} description={t("page_about.description")}>
      <RLContainer class="py-12 sm:py-16 max-w-4xl">
        <header class="mb-12 border-b border-neutral-800 pb-8">
          <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t("page_about.heading")}
          </h1>
          <p class="text-xl text-primary-400 font-medium">{t("page_about.description")}</p>
        </header>

        <div class="space-y-12">
          <section class="space-y-6 text-neutral-300 text-lg leading-relaxed">
            <p>{t("page_about.bioP1")}</p>
            <p>{t("page_about.bioP2")}</p>
          </section>

          <section class="border-t border-neutral-800 pt-8">
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">
              {t("page_about.philosophyHeading")}
            </h2>
            <div class="space-y-4 text-neutral-300 text-lg leading-relaxed">
              <p>{t("page_about.philosophyP1")}</p>
              <p>{t("page_about.philosophyP2")}</p>
            </div>
          </section>

          <section class="border-t border-neutral-800 pt-8">
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">
              {t("page_about.beyondHeading")}
            </h2>
            <p class="text-neutral-300 text-lg leading-relaxed">{t("page_about.beyondP1")}</p>
          </section>

          <section class="border-t border-neutral-800 pt-10 flex flex-wrap gap-4 items-center">
            <RLButton
              label={t("page_about.ctaTalk") || "Let's Talk"}
              href={getRelativeLocaleUrl("/contact")}
              color="primary"
              variant="solid"
              size="lg"
            />
            <RLButton
              label={t("page_about.ctaProjects") || "Browse Projects"}
              href={getRelativeLocaleUrl("/projects")}
              color="neutral"
              variant="outline"
              size="lg"
              trailingIcon="i-lucide-arrow-right"
            />
          </section>
        </div>
      </RLContainer>
    </AppLayout>
  )
}

export default AboutPage
