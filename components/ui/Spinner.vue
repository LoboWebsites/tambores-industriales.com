<template>
    <span class="spinner"></span>
</template>

<style lang="scss" scoped>
    .spinner {
        display: inline-block;
        width: v-bind("sizePx");
        height: v-bind("sizePx");
        border: 2px solid white;
        border-color: v-bind("color");
        border-top-color: transparent;
        border-radius: 50%;
        animation: spinner-animation 0.6s linear infinite;
        padding: 0 !important;
    }

    @keyframes spinner-animation {
        0% {
            transform: translate(0, 0) rotate(0deg);
        }
        100% {
            transform: translate(0, 0) rotate(360deg);
        }
    }
</style>

<script setup>
    const props = defineProps({
        size: {
            type: Number,
            default: 10,
        },
        color: {
            type: String,
            default: "black",
        },
    });

    const sizePx = computed(() => `${props.size}px`);
</script>
