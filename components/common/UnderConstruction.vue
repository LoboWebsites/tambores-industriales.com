<template>
    <div class="h-full w-full flex flex-col items-center pt-12">
        <Icon name="noto-v1:warning" size="64" />
        <p class="text-2xl font-bold">{{ $t("construction", "content", "title") }}</p>
        <p>{{ $t("construction", "content", "subtitle") }}</p>
        <UiButton primary @click="navigateTo('contact')">{{ $t("construction", "content", "contact") }}</UiButton>
    </div>
</template>

<script setup>
    const { $t } = useConfigStore();
</script>
