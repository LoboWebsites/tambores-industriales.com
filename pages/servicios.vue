<template>
    <NuxtLayout>
        <CommonNavbar bg-color="var(--primary)" transparent-on-top color-on-top="white" ctaSecondary />
        <CommonSubpageHeader
            title="Nuestros Servicios"
            subtitle="Renovación y venta de envases metálicos y plásticos para diversos usos industriales. Ofrecemos soluciones personalizadas y calidad garantizada."
            bgImageUrl="/services/services-bg.webp"
        />
        <ServicesContent />
        <CommonFooter />
    </NuxtLayout>
</template>

<script setup>
    const { $t, $i } = useConfigStore();
</script>
