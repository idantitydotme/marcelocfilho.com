import { useHead } from "@solidjs/web";
import { createSeoHead } from "@rimelight/seo/head";
import type { Component } from "solid-js";
import { For } from "solid-js";
import { RLContainer, RLGrid, RLButton } from "@rimelight/ui";
import { t, getLocaleUrl } from "@rimelight/i18n";

export const ServicesPage: Component = () => {
  const servicesList = () => [
    {
      icon: "i-lucide-volume-2",
      title: t("page.services.sound-design-title"),
      description: t("page.services.sound-design-desc"),
    },
    {
      icon: "i-lucide-footprints",
      title: t("page.services.foley-art-title"),
      description: t("page.services.foley-art-desc"),
    },
    {
      icon: "i-lucide-music",
      title: t("page.services.music-composition-title"),
      description: t("page.services.music-composition-desc"),
    },
    {
      icon: "i-lucide-sliders",
      title: t("page.services.mixing-mastering-title"),
      description: t("page.services.mixing-mastering-desc"),
    },
  ];
  useHead(() =>
    createSeoHead({
      title: t("page.services.title"),
      description: t("page.services.description"),
    }),
  );

  return (
    <>
      <RLContainer class="py-12 sm:py-16 max-w-5xl">
        <header class="mb-12 border-b border-neutral-800 pb-8 text-center max-w-3xl mx-auto">
          <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t("page.services.heading")}
          </h1>
          <p class="text-lg sm:text-xl text-neutral-400 leading-relaxed">
            {t("page.services.subheading")}
          </p>
        </header>

        <section class="mb-16">
          <div class="mb-8">
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2">
              {t("page.services.capabilities-title")}
            </h2>
            <p class="text-neutral-400">{t("page.services.capabilities-desc")}</p>
          </div>

          <RLGrid cols={2} class="gap-6">
            <For each={servicesList()}>
              {(service) => (
                <div class="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 hover:border-primary-500/50 transition-colors flex flex-col justify-between">
                  <div>
                    <div class="inline-flex items-center justify-center p-3 rounded-xl bg-primary-500/10 text-primary-400 mb-6 text-2xl">
                      <span class={service.icon} />
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p class="text-neutral-300 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              )}
            </For>
          </RLGrid>
        </section>

        <section class="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 sm:p-12 text-center">
          <h2 class="text-3xl font-extrabold text-white mb-4">{t("page.services.cta-title")}</h2>
          <p class="text-lg text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("page.services.cta-desc")}
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <RLButton
              label={t("page.services.cta-contact") || "Get in Touch"}
              href={getLocaleUrl("/contact")}
              color="primary"
              variant="solid"
              size="lg"
            />
            <RLButton
              label={t("page.services.cta-projects") || "View Projects"}
              href={getLocaleUrl("/projects")}
              color="neutral"
              variant="outline"
              size="lg"
              trailingIcon="i-lucide-arrow-right"
            />
          </div>
        </section>
      </RLContainer>
    </>
  );
};

export default ServicesPage;
