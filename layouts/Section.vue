<template>
    <section
        class="min-h-full"
        :style="{
            paddingBottom: paddingBottom.section,
            paddingTop: paddingTop.section,
        }"
    >
        <div
            class="m-auto"
            :style="{
                maxWidth: maxWidth.section,
            }"
        >
            <slot />
        </div>
    </section>
</template>

<script setup>
    const { maxWidth, paddingBottom, paddingTop } = useLayout();
</script>
