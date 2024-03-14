<template>
    <div class="avatar">
        <img v-if="props.img" :src="img" alt="avatar" />
        <span v-else><Icon name="material-symbols:person" class="text-white" size="24" /></span>
    </div>
</template>

<script setup>
    const props = defineProps({
        img: String,
    });
</script>

<style lang="scss" scoped>
    .avatar {
        border-radius: 50%;
        background-color: rgb(180, 180, 255);
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
</style>
