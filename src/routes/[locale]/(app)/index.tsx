import { useHead } from "@solidjs/web";
import { createSeoHead } from "@rimelight/seo/head";
import { For } from "solid-js";
import { t } from "@rimelight/i18n";
import { RLPageSection, RLLogo, RLButton, RLGrid, RLContainer } from "@rimelight/ui";

export default function IndexPage() {
  const heroLinks = () => [
    {
      label: t("page.home.hero-talk"),
      href: "/contact",
      color: "primary",
      variant: "solid",
    },
    {
      label: t("page.home.hero-projects"),
      href: "/projects",
      color: "primary",
      variant: "outline",
      trailingIcon: "i-lucide-arrow-right",
    },
  ];

  const ctaLinks = () => [
    {
      label: t("page.home.cta-contact"),
      href: "/contact",
      color: "primary",
      variant: "solid",
    },
    {
      label: t("page.home.cta-resume"),
      href: "https://pub-d59ba6f09fc247e5b5215dbca8bb5841.r2.dev/Resume/Resume_Marcelo_C_Filho.pdf",
      target: "_blank",
      color: "neutral",
      variant: "outline",
      trailingIcon: "i-lucide-download",
    },
  ];

  const faqItems = () => [
    { q: t("page.home.faq1.q"), a: t("page.home.faq1.a") },
    { q: t("page.home.faq2.q"), a: t("page.home.faq2.a") },
    { q: t("page.home.faq3.q"), a: t("page.home.faq3.a") },
    { q: t("page.home.faq4.q"), a: t("page.home.faq4.a") },
  ];

  const servicesPreview = [
    {
      icon: "i-lucide-volume-2",
      title: t("app.text.sound-design"),
      description: t("app.text.immersive-soundscapes-and-custom-sfx-for-games-f"),
    },
    {
      icon: "i-lucide-footprints",
      title: t("app.text.foley-art"),
      description: t("app.text.custom-organic-foley-recording-and-physical-inte"),
    },
    {
      icon: "i-lucide-music",
      title: t("app.text.music-composition"),
      description: t("app.text.original-soundtracks-adaptive-themes-and-emotive"),
    },
    {
      icon: "i-lucide-sliders",
      title: t("app.text.mixing-mastering"),
      description: t("app.text.industry-standard-balance-clarity-and-spatial-lo"),
    },
  ];
  useHead(() =>
    createSeoHead({
      title: t("app.text.marcelo-caldart-filho"),
      description: t("app.text.sound-designer-musician"),
    }),
  );

  return (
    <>
      {/* Hero Section */}
      <RLPageSection
        variant="hero"
        reverse={true}
        title={t("page.home.hero-title")}
        description={`${t("page.home.hero-subtitle")} — ${t("page.home.hero-desc")}`}
        links={heroLinks() as any}
      >
        <RLLogo class="pointer-events-none h-64 w-auto drop-shadow-2xl" variant="logomark" />
      </RLPageSection>

      {/* About Preview Section */}
      <RLContainer class="py-12 sm:py-16">
        <div class="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 sm:p-12">
          <div class="max-w-3xl">
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              {t("page.home.about-title")}
            </h2>
            <p class="text-lg text-neutral-300 leading-relaxed mb-8">{t("page.home.about-desc")}</p>
            <div class="flex flex-wrap gap-4">
              <RLButton
                label={t("page.home.about-learn-more")}
                href="/about"
                color="primary"
                variant="solid"
              />
              <RLButton
                label={t("page.home.about-resume")}
                href="/resume"
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
        title={t("page.home.services-title")}
        description={t("page.home.services-desc")}
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
              label={t("page.home.services-view-all")}
              href="/services"
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
            {t("page.home.faq-title")}
          </h2>
          <p class="text-lg text-neutral-400 max-w-2xl mx-auto">{t("page.home.faq-desc")}</p>
        </div>

        <div class="space-y-4">
          <For each={faqItems()}>
            {(item) => (
              <div class="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
                <h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span class="text-primary-400">{t("page.home.faq.question-prefix")}</span>{" "}
                  {item.q}
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
        title={t("page.home.cta-title")}
        description={t("page.home.cta-desc")}
        links={ctaLinks() as any}
      />
    </>
  );
}
