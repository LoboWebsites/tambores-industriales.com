<template>
    <footer class="footer py-14 text-secondary-text">
        <NuxtLayout name="section">
            <div class="flex flex-col md:flex-row gap-12 md:gap-24 text-left justify-between">
                <div class="flex flex-col md:w-1/3">
                    <p class="mb-2">
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
                    <p>
                        {{ $t("footer", "contenido", "descripciónDePágina") }}
                    </p>
                    <div class="flex gap-12 md:gap-24 mt-8 flex-grow items-end">
                        <p>© Copyright {{ new Date().getFullYear() }}</p>
                    </div>
                </div>

                <div class="flex flex-col md:items-center md:w-1/3">
                    <div>
                        <p class="text-xl font-bold mb-2">Links</p>
                        <a
                            v-for="link in links"
                            class="cursor-pointer flex duration-200 hover:text-gray-400"
                            :href="link.navigateTo"
                        >
                            {{ link.name }}
                        </a>
                    </div>
                </div>

                <div class="flex flex-col md:items-end md:w-1/3">
                    <div class="flex flex-col">
                        <p class="text-xl font-bold mb-2">
                            {{ $t("footer", "contenido", "tituloDeContácto") }}
                        </p>
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
                        <UiButton class="mt-6 mb-0 flex-grow items-end" secondary link="/contactanos#top"
                            >Contáctanos
                        </UiButton>
                    </div>
                </div>
            </div>
        </NuxtLayout>
    </footer>
</template>

<script setup>
    const { websiteLinks, contactLinks } = useConstants();
    const { $t } = useConfigStore();

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
