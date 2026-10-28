import { useHead } from "@solidjs/web";
import { createSeoHead } from "@rimelight/seo/head";
import { type Component, For } from "solid-js";
import { RLContainer, RLButton } from "@rimelight/ui";
import { t } from "@rimelight/i18n";

export const ResumePage: Component = () => {
  const experiences = () => [
    {
      role: t("page.resume.exp1-role"),
      company: t("page.resume.exp1-company"),
      period: t("page.resume.exp1-period"),
      bullets: [
        t("page.resume.exp1-bullet1"),
        t("page.resume.exp1-bullet2"),
        t("page.resume.exp1-bullet3"),
      ].filter(Boolean),
    },
    {
      role: t("page.resume.exp2-role"),
      company: t("page.resume.exp2-company"),
      period: t("page.resume.exp2-period"),
      bullets: [t("page.resume.exp2-bullet1"), t("page.resume.exp2-bullet2")].filter(Boolean),
    },
    {
      role: t("page.resume.exp3-role"),
      company: t("page.resume.exp3-company"),
      period: t("page.resume.exp3-period"),
      bullets: [t("page.resume.exp3-bullet1"), t("page.resume.exp3-bullet2")].filter(Boolean),
    },
  ];

  const tools = () => [
    {
      name: "Reaper",
      category: t("page.resume.audio-production"),
      icon: "i-lucide-audio-waveform",
    },
    { name: "Pro Tools", category: t("page.resume.audio-production"), icon: "i-lucide-disc" },
    { name: "DaVinci Resolve", category: t("page.resume.video-editing"), icon: "i-lucide-video" },
  ];
  useHead(() =>
    createSeoHead({
      title: t("page.resume.meta.title"),
      description: t("page.resume.meta.description"),
    }),
  );

  return (
    <>
      <RLContainer class="py-12 sm:py-16 max-w-4xl">
        {/* Header */}
        <header class="mb-12 border-b border-neutral-800 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
              Marcelo Caldart Filho
            </h1>
            <p class="text-xl text-primary-400 font-medium mb-3">{t("page.resume.role")}</p>
            <div class="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <span class="flex items-center gap-1.5">
                <span class="i-lucide-map-pin text-primary-400" /> {t("page.resume.location")}
              </span>
              <span class="flex items-center gap-1.5">
                <span class="i-lucide-check-circle text-green-400" />{" "}
                {t("page.resume.availability")}
              </span>
            </div>
          </div>

          <div class="flex flex-wrap gap-3 items-center">
            <RLButton
              label={t("page.resume.download-cv")}
              href="https://pub-d59ba6f09fc247e5b5215dbca8bb5841.r2.dev/Resume/Resume_Marcelo_C_Filho.pdf"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              variant="solid"
              size="lg"
              leadingIcon="i-lucide-download"
            />
          </div>
        </header>

        <div class="space-y-12">
          {/* Profile */}
          <section>
            <h2 class="text-2xl font-bold text-white mb-4">
              {t("page.resume.about-section-title")}
            </h2>
            <p class="text-neutral-300 text-lg leading-relaxed">{t("page.resume.about-text")}</p>
          </section>

          {/* Experience */}
          <section class="border-t border-neutral-800 pt-8">
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-8">
              {t("page.resume.experience-title")}
            </h2>
            <div class="space-y-8">
              <For each={experiences()}>
                {(exp) => (
                  <div class="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-1">
                      <h3 class="text-xl font-bold text-white">{exp.role}</h3>
                      <span class="text-xs sm:text-sm font-semibold text-primary-400 px-3 py-1 rounded-full bg-primary-500/10 self-start sm:self-auto">
                        {exp.period}
                      </span>
                    </div>
                    <p class="text-sm font-medium text-neutral-400 mb-4">{exp.company}</p>
                    <ul class="space-y-2 text-neutral-300 list-disc list-inside">
                      <For each={exp.bullets}>
                        {(bullet) => <li class="leading-relaxed">{bullet}</li>}
                      </For>
                    </ul>
                  </div>
                )}
              </For>
            </div>
          </section>

          {/* Education & Certifications */}
          <section class="border-t border-neutral-800 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 class="text-2xl font-bold text-white mb-6">{t("page.resume.education-title")}</h2>
              <div class="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
                <h3 class="text-lg font-bold text-white mb-1">{t("page.resume.edu1-degree")}</h3>
                <p class="text-primary-400 font-medium text-sm mb-2">
                  {t("page.resume.edu1-school")}
                </p>
                <span class="text-xs text-neutral-400">{t("page.resume.edu1-period")}</span>
              </div>
            </div>

            <div>
              <h2 class="text-2xl font-bold text-white mb-6">
                {t("page.resume.certifications-title")}
              </h2>
              <div class="space-y-4">
                <div class="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
                  <h3 class="text-base font-bold text-white">{t("page.resume.cert1-name")}</h3>
                </div>
                <div class="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
                  <h3 class="text-base font-bold text-white">{t("page.resume.cert2-name")}</h3>
                </div>
              </div>
            </div>
          </section>

          {/* Technologies & Tools */}
          <section class="border-t border-neutral-800 pt-8">
            <h2 class="text-2xl font-bold text-white mb-6">
              {t("page.resume.technologies-title")}
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <For each={tools()}>
                {(tool) => (
                  <div class="flex items-center gap-3 p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
                    <span class={`${tool.icon} text-2xl text-primary-400`} />
                    <div>
                      <div class="font-bold text-white">{tool.name}</div>
                      <div class="text-xs text-neutral-400">{tool.category}</div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </section>

          {/* Languages */}
          <section class="border-t border-neutral-800 pt-8 pb-4">
            <h2 class="text-2xl font-bold text-white mb-6">{t("page.resume.languages-title")}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 flex justify-between items-center">
                <span class="font-bold text-white">{t("page.resume.lang-pt")}</span>
                <span class="text-sm text-primary-400 font-medium">
                  {t("page.resume.lang-pt-level")}
                </span>
              </div>
              <div class="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 flex justify-between items-center">
                <span class="font-bold text-white">{t("page.resume.lang-en")}</span>
                <span class="text-sm text-primary-400 font-medium">
                  {t("page.resume.lang-en-level")}
                </span>
              </div>
            </div>
          </section>
        </div>
      </RLContainer>
    </>
  );
};

export default ResumePage;
