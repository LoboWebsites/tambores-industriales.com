<template>
    <UiButton class="w-full btn-google" @click.prevent="login">
        <Icon name="logos:google-icon" class="absolute left-6" />
        <slot />
    </UiButton>
</template>

<script setup>
    const firebaseAuth = useFirebaseAuth();
    const emit = defineEmits(["navigateToDashboard"]);

    async function login() {
        if (await firebaseAuth.SignIn(1)) {
            emit("navigateToDashboard");
        }
    }
</script>

<style lang="scss" scoped>
    .btn-google {
        border: 1px solid rgb(243, 243, 243);
    }
</style>
