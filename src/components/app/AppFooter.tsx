import { type Component, For } from "solid-js";
import {
  RLFooter,
  RLLogo,
  RLButton,
  RLLinkGroup,
  RLThemeSelector,
  RLLocaleSelector,
  type RLButtonProps,
  type RLLinkGroupProps,
} from "@rimelight/ui";
import { t, getLocaleUrl } from "@rimelight/i18n";

export const AppFooter: Component = () => {
  const columns = (): RLLinkGroupProps[] => [
    {
      label: t("app_footer.links_navigation_label") || "Navigation",
      links: [
        {
          label: t("app_footer.links_projects") || "Projects",
          href: getLocaleUrl("/projects"),
        },
        {
          label: t("app_footer.links_services") || "Services",
          href: getLocaleUrl("/services"),
        },
        {
          label: t("app_footer.links_about") || "About",
          href: getLocaleUrl("/about"),
        },
        {
          label: t("app_footer.links_resume") || "Resume",
          href: getLocaleUrl("/resume"),
        },
        {
          label: t("app_footer.links_contact") || "Contact",
          href: getLocaleUrl("/contact"),
        },
      ],
    },
    {
      label: t("app_footer.links_legal_label") || "Legal",
      links: [
        {
          label: t("app_footer.links_resources_cv") || "Download CV",
          href: "https://pub-d59ba6f09fc247e5b5215dbca8bb5841.r2.dev/Resume/Resume_Marcelo_C_Filho.pdf",
        },
        {
          label: t("app_footer.links_legal_privacy-policy") || "Privacy Policy",
          href: getLocaleUrl("/legal/privacy-policy"),
        },
        {
          label: t("app_footer.links_legal_other-documents") || "Legal Documents",
          href: getLocaleUrl("/legal"),
        },
      ],
    },
  ];

  const socials = (): RLButtonProps[] => [
    {
      leadingIcon: "i-logos-soundcloud-icon?mask text-white group-hover:text-primary-500",
      href: "https://www.soundcloud.com/marcelo-filho-32565359",
    },
    {
      leadingIcon: "i-logos-linkedin-icon?mask text-white group-hover:text-primary-500",
      href: "https://www.linkedin.com/marcelocfilho",
    },
  ];

  const targetLanguages = () => [
    { code: "en", label: "English", href: getLocaleUrl("/en") },
    { code: "pt", label: "Português", href: getLocaleUrl("/pt") },
  ];

  return (
    <RLFooter
      contain={false}
      data-theme="dark"
      class="bg-black z-50"
      left={
        <div class="flex flex-col justify-between h-full gap-xs lg:items-start">
          <RLLogo variant="logotype" class="h-6 w-auto" />
          <div>
            <p class="text-sm text-neutral-400">
              {t("app_footer.tagline") || "Sound Designer & Musician"}
            </p>
            <span class="text-sm text-neutral-500">
              © {new Date().getFullYear()} Marcelo Caldart Filho
            </span>
          </div>
        </div>
      }
      center={
        <div class="flex flex-col md:flex-row gap-12">
          <For each={columns()}>{(column) => <RLLinkGroup {...column} />}</For>
        </div>
      }
      right={
        <div class="flex flex-col justify-between h-full gap-sm lg:items-end">
          <div class="flex flex-col gap-sm items-center lg:items-end">
            <RLThemeSelector class="min-w-44" />
            <RLLocaleSelector locales={targetLanguages()} class="min-w-44" />
          </div>
          <div class="flex flex-row flex-wrap gap-sm justify-center lg:justify-end items-center lg:items-end">
            <For each={socials()}>
              {(social) => <RLButton variant="ghost" size="xl" {...social} />}
            </For>
          </div>
        </div>
      }
    />
  );
};

export default AppFooter;
