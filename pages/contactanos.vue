<template>
    <NuxtLayout>
        <CommonNavbar bg-color="var(--primary)" transparent-on-top color-on-top="white" ctaSecondary />
        <CommonSubpageHeader
            title="Contáctanos"
            subtitle="¡Contáctanos para solicitar nuestros servicios! Completa el formulario y nos pondremos en contacto contigo lo antes posible."
            bgImageUrl="/contact/contact-us-bg.webp"
        />
        <ContactContent />
        <CommonFooter />
    </NuxtLayout>
</template>

<script setup>
    useHead({ link: [{ rel: "preload", href: "/contact/contact-us-bg.webp" }] });
</script>
