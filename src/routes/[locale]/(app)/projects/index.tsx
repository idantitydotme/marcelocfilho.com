import { useHead } from "@solidjs/web";
import { createSeoHead } from "@rimelight/seo/head";
import { For, createSignal, createMemo } from "solid-js";
import { t } from "@rimelight/i18n";
import { RLPageSection, RLTabs, RLGrid, RLPost } from "@rimelight/ui";

function getPageTitle(title: unknown): string {
  return t.localize(title);
}

export default function ProjectsIndexPage() {
  const [activeTab, setActiveTab] = createSignal("all");

  const projectPages = createMemo<any[]>(
    async () => {
      try {
        const res = await fetch("/api/cms/pages");
        if (!res.ok) return [];
        const data = (await res.json()) as any;
        const pagesList = (data.pages || []) as any[];
        return pagesList.filter((page: any) => page.type === "projects");
      } catch {
        return [];
      }
    },
    { loadingValue: [] },
  );

  const categoryMessages = () => ({
    website: t("page.projects.categories.website"),
    app: t("page.projects.categories.app"),
    other: t("page.projects.categories.other"),
  });

  const badgeColorMap: Record<string, "info" | "primary" | "success"> = {
    website: "info",
    app: "primary",
    other: "success",
  };

  const tabsItems = () => [
    { label: t("app.text.all"), value: "all" },
    { label: categoryMessages()["website"] || "Audiovisual", value: "website" },
    { label: categoryMessages()["app"] || "Games", value: "app" },
    { label: categoryMessages()["other"] || "Music & Sound", value: "other" },
  ];

  const filteredProjects = () => {
    const all = projectPages() || [];
    if (activeTab() === "all") return all;
    return all.filter((page) => {
      const content = typeof page.content === "string" ? JSON.parse(page.content) : page.content;
      return (content?.properties?.category || "other") === activeTab();
    });
  };
  useHead(() =>
    createSeoHead({
      title: t("page.projects.meta.title"),
      description: t("page.projects.meta.description"),
    }),
  );

  return (
    <>
      <RLPageSection
        title={t("page.projects.meta.title")}
        description={t("page.projects.meta.description")}
      >
        <RLTabs
          items={tabsItems()}
          variant="underline"
          value={activeTab()}
          onChange={(val: string) => setActiveTab(val)}
        />

        <div class="mt-6">
          <RLGrid cols={4}>
            <For each={filteredProjects()}>
              {(page, index) => {
                const content =
                  typeof page.content === "string" ? JSON.parse(page.content) : page.content;
                const titleVal = getPageTitle(page.title);
                const category = content?.properties?.category || "other";
                const postDate = page.postedAt || page.createdAt;
                return (
                  <RLPost
                    variant="ghost"
                    orientation={index() === 0 ? "horizontal" : "vertical"}
                    class={index() === 0 ? "col-span-full mb-6" : ""}
                    image={content?.properties?.heroImage}
                    date={postDate}
                    title={titleVal}
                    description={content?.properties?.description}
                    to={`/projects/${page.slug}/`}
                    badge={
                      categoryMessages()[category as keyof ReturnType<typeof categoryMessages>] ??
                      category
                    }
                    badgeColor={badgeColorMap[category] || "primary"}
                  />
                );
              }}
            </For>
          </RLGrid>
        </div>
      </RLPageSection>
    </>
  );
}
