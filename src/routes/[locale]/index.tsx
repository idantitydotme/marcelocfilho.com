import type { Component } from "solid-js";
import { For } from "solid-js";
import AppLayout from "#layouts/AppLayout";
import { t, getLocaleUrl } from "@rimelight/i18n";
import { RLPageSection, RLLogo, RLButton, RLGrid, RLContainer } from "@rimelight/ui";

export const IndexPage: Component = () => {
  const heroLinks = () => [
    {
      label: t("playground.heroTalk") || "Let's Talk",
      href: getLocaleUrl("/contact"),
      color: "primary",
      variant: "solid",
    },
    {
      label: t("playground.heroProjects") || "View Projects",
      href: getLocaleUrl("/projects"),
      color: "primary",
      variant: "outline",
      trailingIcon: "i-lucide-arrow-right",
    },
  ];

  const ctaLinks = () => [
    {
      label: t("playground.ctaContact") || "Get in Touch",
      href: getLocaleUrl("/contact"),
      color: "primary",
      variant: "solid",
    },
    {
      label: t("playground.ctaResume") || "Download CV",
      href: "https://pub-d59ba6f09fc247e5b5215dbca8bb5841.r2.dev/Resume/Resume_Marcelo_C_Filho.pdf",
      target: "_blank",
      color: "neutral",
      variant: "outline",
      trailingIcon: "i-lucide-download",
    },
  ];

  const faqItems = () => [
    { q: t("playground.faq1_q"), a: t("playground.faq1_a") },
    { q: t("playground.faq2_q"), a: t("playground.faq2_a") },
    { q: t("playground.faq3_q"), a: t("playground.faq3_a") },
    { q: t("playground.faq4_q"), a: t("playground.faq4_a") },
  ];

  const servicesPreview = [
    {
      icon: "i-lucide-volume-2",
      title: "Sound Design",
      description: "Immersive soundscapes and custom SFX for games, film, and multimedia.",
    },
    {
      icon: "i-lucide-footprints",
      title: "Foley Art",
      description: "Custom organic Foley recording and physical interaction textures.",
    },
    {
      icon: "i-lucide-music",
      title: "Music Composition",
      description: "Original soundtracks, adaptive themes, and emotive scores.",
    },
    {
      icon: "i-lucide-sliders",
      title: "Mixing & Mastering",
      description: "Industry-standard balance, clarity, and spatial loudness optimization.",
    },
  ];

  return (
    <AppLayout title="Marcelo Caldart Filho" description="Sound Designer & Musician">
      {/* Hero Section */}
      <RLPageSection
        variant="hero"
        reverse={true}
        title={t("playground.heroTitle")}
        description={`${t("playground.heroSubtitle")} — ${t("playground.heroDesc")}`}
        links={heroLinks() as any}
      >
        <RLLogo class="pointer-events-none h-64 w-auto drop-shadow-2xl" variant="logomark" />
      </RLPageSection>

      {/* About Preview Section */}
      <RLContainer class="py-12 sm:py-16">
        <div class="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 sm:p-12">
          <div class="max-w-3xl">
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {t("playground.aboutTitle")}
            </h2>
            <p class="text-lg text-neutral-300 leading-relaxed mb-8">{t("playground.aboutDesc")}</p>
            <div class="flex flex-wrap gap-4">
              <RLButton
                label={t("playground.aboutLearnMore") || "Learn More"}
                href={getLocaleUrl("/about")}
                color="primary"
                variant="solid"
              />
              <RLButton
                label={t("playground.aboutResume") || "Resume"}
                href={getLocaleUrl("/resume")}
                color="neutral"
                variant="outline"
              />
            </div>
          </div>
        </div>
      </RLContainer>

      {/* Services Capabilities Section */}
      <RLPageSection
        orientation="vertical"
        title={t("playground.servicesTitle")}
        description={t("playground.servicesDesc")}
      >
        <div class="flex flex-col gap-xl">
          <RLGrid cols={2} class="gap-6">
            <For each={servicesPreview}>
              {(service) => (
                <div class="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 hover:border-primary-500/40 transition-colors">
                  <div class="inline-flex items-center justify-center p-3 rounded-xl bg-primary-500/10 text-primary-400 mb-4 text-2xl">
                    <span class={service.icon} />
                  </div>
                  <h3 class="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p class="text-neutral-300 text-sm leading-relaxed">{service.description}</p>
                </div>
              )}
            </For>
          </RLGrid>

          <div class="flex justify-center mt-4">
            <RLButton
              label={t("playground.servicesViewAll") || "View All Services"}
              href={getLocaleUrl("/services")}
              color="primary"
              variant="link"
              trailingIcon="i-lucide-arrow-right"
            />
          </div>
        </div>
      </RLPageSection>

      {/* FAQ Section */}
      <RLContainer class="py-12 sm:py-16 max-w-4xl">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            {t("playground.faqTitle")}
          </h2>
          <p class="text-lg text-neutral-400 max-w-2xl mx-auto">{t("playground.faqDesc")}</p>
        </div>

        <div class="space-y-4">
          <For each={faqItems()}>
            {(item) => (
              <div class="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
                <h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span class="text-primary-400">Q.</span> {item.q}
                </h3>
                <p class="text-neutral-300 text-base leading-relaxed pl-6">{item.a}</p>
              </div>
            )}
          </For>
        </div>
      </RLContainer>

      {/* CTA Section */}
      <RLPageSection
        variant="cta"
        ctaVariant="solid"
        title={t("playground.ctaTitle")}
        description={t("playground.ctaDesc")}
        links={ctaLinks() as any}
      />
    </AppLayout>
  );
};

export default IndexPage;
