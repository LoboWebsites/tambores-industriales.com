<template>
    <NuxtLayout>
        <CommonNavbar bg-color="var(--primary)" :scroll-hide="!sm" transparent-on-top cta-primary />
        <HomeHeroSection />
        <HomeServices />
        <HomeContactUs />
        <HomeFindUs />
        <CommonFooter />
    </NuxtLayout>
</template>

<script setup>
    const { sm } = useScreen;
    useHead({ link: [{ rel: "preload", href: "/home/hero-section-bg.webp" }] });
</script>
