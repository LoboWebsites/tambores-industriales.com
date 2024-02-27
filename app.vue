<template>
    <NuxtLayout id="top">
        <NuxtPage></NuxtPage>
        <UiToast />
    </NuxtLayout>
</template>

<script setup lang="ts">
    const configStore = useConfigStore();
    useHead({
        htmlAttrs: {
            lang: configStore.lang,
        },
    });

    useSeoMeta({
        title: "Tambores Industriales",
        description: "Tambores abiertos, tambores cerrados, contenedores de plástico. Bogotá.",
    });
</script>

<style lang="scss">
    body,
    html {
        background-color: var(--background);
        color: var(--primary-text);
        font-family: "Poppins", sans-serif, Helvetica, Arial, system-ui;
        overflow-x: hidden;
    }
</style>
