<template>
    <NuxtLayout>
        <CommonNavbar bg-color="var(--primary)" :scroll-hide="!sm" />
        <HomeHeroSection />/
        <CommonFooter />
    </NuxtLayout>
</template>

<script setup>
    const { sm } = useScreen;
</script>
