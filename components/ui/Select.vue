<template>
    <div class="relative border-2 border-gray-200 p-2 rounded-lg w-64">
        <div class="cursor-pointer" @click.prevent.stop="onClick">
            <div class="flex justify-between items-center">
                <div class="overflow-x-hidden text-ellipsis whitespace-nowrap">
                    <slot />
                </div>
                <Icon name="mdi:chevron-down" />
            </div>
        </div>
        <div
            ref="itemsWrapper"
            :class="itemsClass"
            class="absolute right-0 bg-background rounded-sm shadow-lg text-primary-text p-2 z-50 duration-300"
            @click="onClick"
        >
            <div class="m-2 overflow-x-hidden" :class="itemsInnerClass">
                <slot name="items" />
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        leftAligned: Boolean,
        noItemsOverflow: Boolean,
    });

    const show = ref(false);
    const itemsWrapper = ref(null);

    const itemsClass = computed(() => {
        let classname = show.value ? "opacity-100 translate-y-2" : "opacity-0 ";
        classname += props.leftAligned ? " left-0" : " right-0";
        return classname;
    });
    const itemsInnerClass = computed(() => {
        let classname = props.noItemsOverflow ? " " : " max-h-28 overflow-y-auto";
        return classname;
    });

    function onClick() {
        if (!show.value) {
            itemsWrapper.value.classList.remove("hidden");
        } else {
            setTimeout(() => {
                itemsWrapper.value.classList.add("hidden");
            }, 300);
        }
        show.value = !show.value;
    }

    function hideOnClickOutside(event) {
        if (itemsWrapper.value) {
            const isClickInsideMenu = itemsWrapper.value.contains(event.target);
            if (!isClickInsideMenu) {
                itemsWrapper.value.classList.add("hidden");
                show.value = false;
            }
        }
    }

    onMounted(() => {
        document.addEventListener("click", hideOnClickOutside);
        itemsWrapper.value.classList.add("hidden");
    });

    onUnmounted(() => {
        document.removeEventListener("click", hideOnClickOutside);
    });
</script>
