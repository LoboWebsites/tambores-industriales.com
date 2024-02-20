<template>
    <footer class="footer py-14 text-secondary-text">
        <NuxtLayout name="section">
            <div class="flex flex-col md:flex-row gap-12 md:gap-24 text-left justify-between">
                <div class="md:w-1/3">
                    <p>
                        <a href="#top">
                            <img
                                src="/placeholder.png"
                                alt="test logo"
                                loading="lazy"
                                class="cursor-pointer"
                                style="max-width: 40px"
                            />
                        </a>
                    </p>
                    <UiDivider class="my-2" />
                    <p>
                        {{ $t("footer", "content", "siteDescription") }}
                    </p>
                </div>

                <div class="flex flex-col md:items-center md:w-1/3">
                    <div>
                        <p class="text-xl font-bold">Links</p>
                        <UiDivider class="mb-2" />
                        <a v-for="link in links" class="cursor-pointer flex" :href="link.navigateTo">
                            {{ link.name }}<UiHoverUnderline />
                        </a>
                    </div>
                </div>

                <div class="flex flex-col md:items-end md:w-1/3">
                    <div>
                        <p class="text-xl font-bold">
                            {{ $t("footer", "content", "contactMeTitle") }}
                        </p>
                        <UiDivider class="mb-2" />
                        <p class="flex gap-2 items-center" v-for="(l, i) in contactLinks" :key="i">
                            <Icon :name="l.icon" />
                            <a
                                :href="l.link"
                                target="_blank"
                                :alt="l.name"
                                v-if="l.link"
                                class="underline cursor-pointer"
                            >
                                {{ l.text }}
                            </a>
                            <span v-else>{{ l.text }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex justify-center gap-12 md:gap-24 mt-8">
                <p>© Copyright {{ new Date().getFullYear() }}</p>
                <p class="underline">
                    <Icon name="ic:sharp-language" size="20" />
                    <a @click="switchLanguage" class="cursor-pointer">
                        {{ lang === "es" ? "See the page in english" : "Ver la página en español" }}
                    </a>
                </p>
            </div>
        </NuxtLayout>
    </footer>
</template>

<script setup>
    const { websiteLinks, contactLinks } = useConstants();
    const { $t, lang, switchLanguage } = useConfigStore();

    const links = computed(() => {
        let links = [];
        for (const link of websiteLinks.value) {
            if (link.list) {
                for (const sublink of link.list) {
                    links.push(sublink);
                }
            } else {
                links.push(link);
            }
        }

        return links;
    });
</script>

<style lang="scss" scoped>
    .footer {
        background: var(--primary);
    }
</style>
