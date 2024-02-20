<template>
    <form @submit.prevent.stop="onSubmit" class="form flex flex-col gap-4 text-left">
        <label for="input1">{{ $t("forms", "contactForm", "formNameInput") }} </label>
        <input
            id="input1"
            class="bg-white rounded-lg h-12 px-4 py-2 duration-700 outline-transparent focus-visible:outline-primary text-primary-text"
            v-model="form.input1"
        />

        <label for="input2">{{ $t("forms", "contactForm", "formEmailInput") }} </label>
        <input
            id="input2"
            class="bg-white rounded-lg h-12 px-4 py-2 duration-700 outline-transparent focus-visible:outline-primary text-primary-text"
            v-model="form.input2"
        />

        <label for="input2">{{ $t("forms", "contactForm", "formMessageInput") }} </label>
        <textarea
            id="input3"
            class="bg-white rounded-lg h-24 px-4 py-2 duration-700 outline-transparent focus-visible:outline-primary text-primary-text resize-none"
            v-model="form.message"
        />

        <UiButton type="submit" primary :disabled="submitBtn.disabled" class="duration-200" :class="submitBtn.class">
            {{ submitBtn.text }}
        </UiButton>
    </form>
</template>

<script setup>
    const { $t } = useConfigStore();
    const form = ref({
        input1: "",
        input2: "",
        message: "",
    });

    const submitBtn = ref({
        text: $t("forms", "contactForm", "formSubmitButton"),
        disabled: false,
        class: "",
    });

    function onSubmit() {
        form.value.input1 = form.value.input1.replaceAll(/\s/g, "");
        submitBtn.value.text = $t("forms", "contactForm", "formSubmitButtonSuccess");
        submitBtn.value.disabled = true;
    }
</script>

<style lang="scss" scoped>
    .form {
        max-width: 600px;
        min-width: 260px;

        @media (min-width: 768px) {
            min-width: 400px;
        }
    }
</style>
