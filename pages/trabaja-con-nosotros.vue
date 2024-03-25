<template>
    <NuxtLayout>
        <CommonNavbar
            bg-color="var(--primary)"
            transparent-on-top
            color-on-top="white"
            ctaSecondary
            logo-src="/logo-light.webp"
        />
        <CommonSubpageHeader
            title="Trabaja con nosotros"
            subtitle="Quieres trabajar con nosotros? Completa el formulario de solicitud de empleo y déjanos conocerte mejor."
            bgImageUrl="/work-with-us/work-with-us-bg.webp"
        />
        <WorkWithUsContent />
        <CommonFooter />
    </NuxtLayout>
</template>

<script setup>
    useHead({ link: [{ rel: "preload", href: "/work-with-us/work-with-us-bg.webp" }] });
</script>
