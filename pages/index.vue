<template>
    <NuxtLayout>
        <CommonNavbar bg-color="var(--primary)" transparent-on-top cta-primary :logo-src="logoSrc" />
        <HomeHeroSection />
        <HomeServices />
        <HomeContactUs />
        <HomeFindUs />
        <CommonFooter />
    </NuxtLayout>
</template>

<script setup>
    useHead({ link: [{ rel: "preload", href: "/home/hero-section-bg.webp" }] });

    const scrollY = ref(0);
    const logoSrc = ref("/logo.webp");

    function updateScrollPosition() {
        scrollY.value = window.scrollY;
        if (window.scrollY !== 0 && logoSrc.value === "/logo.webp") {
            setTimeout(() => {
                logoSrc.value = "/logo-light.webp";
            }, 350);
        } else if (window.scrollY === 0 && logoSrc.value === "/logo-light.webp") {
            logoSrc.value = "/logo.webp";
        }
    }

    onMounted(() => {
        window.addEventListener("scroll", updateScrollPosition);
    });
</script>
