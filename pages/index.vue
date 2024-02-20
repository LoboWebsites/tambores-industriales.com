<template>
    <NuxtLayout>
        <CommonNavbar :scroll-hide="!isMobile" primary />
        <NuxtLayout name="section">
            <div class="mt-32 flex flex-col items-center">
                <div>{{ $t("home", "body", "hello") }}</div>
                <img :src="$i(1)" style="max-width: 400px" />
            </div>
        </NuxtLayout>
        <CommonFooter />
    </NuxtLayout>
</template>

<script setup>
    const { $t, $i } = useConfigStore();
    const isMobile = ref(null);
    onMounted(() => {
        isMobile.value = window.screen.width < 500;
    });
</script>
