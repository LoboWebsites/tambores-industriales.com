<template>
    <div>Redirecting...</div>
</template>

<script setup>
    const url =
        useRuntimeConfig().public.ENV === "dev" ? "http://localhost:3001/login" : "https://www.lobowebsites.com/login";
    navigateTo(url, { external: true });
</script>
