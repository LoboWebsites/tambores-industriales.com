<template>
    <dialog
        ref="dialog"
        class="dialog rounded-xl duration-300 bg-gray-100 opacity-0 outline-none backdrop:opacity-0 backdrop:duration-300 m-auto"
        :class="modalClass"
        @close.capture.prevent.stop="close"
        @cancel.capture.prevent.stop="close"
    >
        <div class="flex flex-col">
            <Icon name="carbon:close" size="28" class="cursor-pointer self-end fixed" @click="close" />
            <slot />
        </div>
    </dialog>
</template>

<script setup>
    const dialog = ref(null);
    const modalClass = ref("");

    function show() {
        dialog.value.showModal();
        modalClass.value = "opacity-100 backdrop:opacity-100";
        document.getElementsByTagName("html")[0].style.overflowY = "hidden";
    }

    function close() {
        modalClass.value = "opacity-0 backdrop:opacity-0";
        document.getElementsByTagName("html")[0].style.overflowY = "auto";

        setTimeout(() => {
            dialog.value.close();
        }, 300);
    }

    defineExpose({
        show,
        close,
    });
</script>

<style lang="scss" scoped>
    .dialog {
        position: fixed;
        &::backdrop {
            background: rgba(0, 0, 0, 0.3);
        }
    }
</style>
