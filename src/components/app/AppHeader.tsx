import { type Component, For } from "solid-js";
import {
  RLHeader,
  RLLogo,
  RLNavigationMenu,
  RLButton,
  RLSlideover,
  type RLButtonProps,
} from "@rimelight/ui";
import { t } from "@rimelight/i18n";

export interface AppHeaderProps {
  stackIndex?: number;
}

export const AppHeader: Component<AppHeaderProps> = (props) => {
  const leftLinks = () => [
    {
      label: t("app.header.left-links.projects.label") || "Projects",
      to: "/projects",
    },
    {
      label: t("app.header.left-links.services.label") || "Services",
      to: "/services",
    },
    {
      label: t("app.header.left-links.about.label") || "About",
      to: "/about",
    },
    {
      label: t("app.header.left-links.resume.label") || "Resume",
      to: "/resume",
    },
    {
      label: t("app.header.left-links.contact.label") || "Contact",
      to: "/contact",
    },
    {
      label: t("app.header.left-links.blog.label") || "Blog",
      to: "/blog",
    },
  ];

  const socials = (): RLButtonProps[] => [
    {
      variant: "ghost",
      leadingIcon: "i-logos-soundcloud-icon?mask text-white group-hover:text-primary-500",
      href: "https://www.soundcloud.com/marcelo-filho-32565359",
    },
    {
      variant: "ghost",
      leadingIcon: "i-logos-linkedin-icon?mask text-white group-hover:text-primary-500",
      href: "https://www.linkedin.com/marcelocfilho",
    },
  ];

  return (
    <RLHeader
      contain={false}
      fixed={true}
      stackIndex={props.stackIndex ?? 1}
      data-theme="dark"
      class="bg-black"
      left={
        <div class="flex items-center gap-md">
          <div class="hidden md:flex flex-row gap-md items-center">
            <RLLogo variant="logomark" class="h-10 w-auto" mode="white" />
            <RLNavigationMenu
              items={leftLinks()}
              variant="link"
              theme="flat"
              ui={{
                link: "text-white transition-colors duration-200 hover:text-primary-400 data-[state=open]:text-primary-400 aria-[current]:text-primary-400",
              }}
            />
          </div>

          <div class="block md:hidden">
            <RLSlideover
              side="left"
              title="Menu"
              trigger={
                <RLButton
                  color="neutral"
                  variant="ghost"
                  rounded={true}
                  leadingIcon="i-lucide-menu"
                  class="!text-white"
                  aria-label="Open Menu"
                />
              }
            >
              <RLNavigationMenu
                items={leftLinks()}
                orientation="vertical"
                variant="link"
                ui={{
                  link: "text-black dark:text-white flex justify-start items-center w-full text-left py-2 text-lg transition-colors duration-200 hover:text-primary-400 data-[state=open]:text-primary-400 aria-[current]:text-primary-400",
                }}
              />
            </RLSlideover>
          </div>
        </div>
      }
      center={
        <div class="flex items-center gap-md">
          <div class="block md:hidden">
            <RLLogo variant="logomark" class="h-10 w-auto" mode="white" />
          </div>
        </div>
      }
      right={
        <div class="flex items-center gap-md">
          <div class="hidden md:flex flex-row gap-md items-center">
            <For each={socials()}>{(buttonProps) => <RLButton {...buttonProps} />}</For>
          </div>

          <div class="block md:hidden">
            <RLSlideover
              side="right"
              title="Actions"
              trigger={
                <RLButton
                  color="neutral"
                  variant="ghost"
                  rounded={true}
                  leadingIcon="i-lucide-ellipsis-vertical"
                  class="!text-white"
                  aria-label="Open Actions"
                />
              }
            >
              <div class="flex flex-col gap-md">
                <For each={socials()}>
                  {(buttonProps) => <RLButton {...buttonProps} block={true} />}
                </For>
              </div>
            </RLSlideover>
          </div>
        </div>
      }
    />
  );
};

export default AppHeader;
