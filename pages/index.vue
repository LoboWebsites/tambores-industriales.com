<template>
    <NuxtLayout>
        <CommonNavbar bg-color="var(--primary)" :scroll-hide="!sm" transparent-on-top />
        <HomeHeroSection />
        <HomeServices />
        <HomeContactUs />
        <HomeFindUs />
        <CommonFooter />
    </NuxtLayout>
</template>

<script setup>
    const { sm } = useScreen;
</script>
