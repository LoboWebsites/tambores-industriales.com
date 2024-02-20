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
        title: "Example Website",
        description: "Example description.",
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
