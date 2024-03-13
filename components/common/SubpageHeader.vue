<template>
    <div class="relative shadow-sm" style="height: 350px">
        <img
            :src="bgImageUrl"
            class="absolute top-0 z-0 brightness-75 h-full w-full"
            style="min-width: 1600px"
            :alt="title"
        />
        <NuxtLayout name="section">
            <div class="relative flex flex-col items-center m-auto text-white mt-24 lg:w-7/12 text-center">
                <p class="text-4xl font-bold text-center mb-4">{{ title }}</p>
                <p>{{ subtitle }}</p>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
    const { bgImageUrl, title } = defineProps({
        bgImageUrl: String,
        title: String,
        subtitle: String,
    });
</script>
