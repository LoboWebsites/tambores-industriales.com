<template>
    <div ref="loboPreview"></div>
</template>

<script setup>
    const { previewElement } = useConfigStore();
    const loboPreview = ref(null);

    onMounted(() => {
        loboPreview.value.appendChild(previewElement);
    });
</script>
