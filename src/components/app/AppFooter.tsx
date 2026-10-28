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
import { t } from "@rimelight/i18n";

export const AppFooter: Component = () => {
  const columns = (): RLLinkGroupProps[] => [
    {
      label: t("app.footer.links.navigation.label"),
      links: [
        {
          label: t("app.footer.links.projects"),
          href: "/projects",
        },
        {
          label: t("app.footer.links.services"),
          href: "/services",
        },
        {
          label: t("app.footer.links.about"),
          href: "/about",
        },
        {
          label: t("app.footer.links.resume"),
          href: "/resume",
        },
        {
          label: t("app.footer.links.contact"),
          href: "/contact",
        },
      ],
    },
    {
      label: t("app.footer.links.legal.label"),
      links: [
        {
          label: t("app.footer.links.resources.cv"),
          href: "https://pub-d59ba6f09fc247e5b5215dbca8bb5841.r2.dev/Resume/Resume_Marcelo_C_Filho.pdf",
        },
        {
          label: t("app.footer.links.legal.privacy-policy"),
          href: "/legal/privacy-policy",
        },
        {
          label: t("app.footer.links.legal.other-documents"),
          href: "/legal",
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

  return (
    <RLFooter
      contain={false}
      data-theme="dark"
      class="bg-black z-50"
      left={
        <div class="flex flex-col justify-between h-full gap-xs lg:items-start">
          <RLLogo variant="logotype" class="h-6 w-auto" />
          <div>
            <p class="text-sm text-neutral-400">{t("app.footer.tagline")}</p>
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
            <RLLocaleSelector class="min-w-44" />
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
