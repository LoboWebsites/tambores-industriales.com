<template>
    <div class="h-1 w-24 rounded-md" :class="primary ? 'bg-primary' : 'bg-white'"></div>
</template>

<script setup>
    const props = defineProps({
        primary: Boolean,
    });
</script>
