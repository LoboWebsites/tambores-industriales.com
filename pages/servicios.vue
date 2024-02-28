<template>
    <NuxtLayout>
        <CommonNavbar bg-color="var(--primary)" />
        <NuxtLayout name="section">
            <div class="mt-32 flex flex-col items-center">
                <div>{{ $t("about", "body", "hello") }}</div>
                <img :src="$i(1)" style="max-width: 400px" />
            </div>
        </NuxtLayout>
        <CommonFooter />
    </NuxtLayout>
</template>

<script setup>
    const { $t, $i } = useConfigStore();
</script>
