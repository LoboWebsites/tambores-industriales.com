<template>
    <button :type="type" :class="btnClass" class="flex justify-center items-center" :disabled="disabled">
        <slot />
    </button>
</template>

<script setup>
    const props = defineProps({
        outlined: Boolean,
        primary: Boolean,
        secondary: Boolean,
        type: String,
        disabled: Boolean,
    });

    const btnClass = computed(() => {
        let name =
            "flex justify-center text-primary-text font-semibold py-3 px-4 lg:px-10 rounded-sm shadow-xl z-10 transition ease-in duration-150 transform hover:opacity-70 outline-none";

        let types = {
            primary: " bg-primary text-white ",
            secondary: " bg-secondary text-primary-text",
            outlined: " text-primary bg-transparent border-primary border-2 ",
            default: " bg-background ",
        };

        name += !props.primary && !props.outlined ? types.default : "";
        name += props.primary ? types.primary : "";
        name += props.secondary ? types.secondary : "";
        name += props.outlined ? types.outlined : "";
        name += props.disabled ? " opacity-40 hover:opacity-40" : "";
        return name;
    });
</script>
