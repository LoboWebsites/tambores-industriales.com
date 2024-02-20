<template>
    <div class="relative">
        <div
            class="cursor-pointer"
            @click.prevent.stop="isVisible ? hide() : show()"
            @mouseenter="openOnHover ? onMouseEnter() : null"
            @mouseleave="openOnHover ? onMouseLeave() : null"
        >
            <slot />
        </div>
        <div
            ref="itemsWrapper"
            :class="itemsClass"
            class="absolute right-0 bg-background rounded-sm shadow-lg text-primary-text p-2 z-50 duration-100"
            @mouseenter="openOnHover ? onMouseEnter() : null"
            @mouseleave="openOnHover ? onMouseLeave() : null"
        >
            <div class="m-2 overflow-x-hidden" :class="itemsInnerClass">
                <slot name="content" />
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        leftAligned: Boolean,
        noItemsOverflow: Boolean,
        openOnHover: Boolean,
    });

    const isVisible = ref(false);
    const itemsWrapper = ref(null);
    const hoverTimeout = ref(null);

    const itemsClass = computed(() => {
        let classname = isVisible.value ? "opacity-100 " : "opacity-0 ";
        classname += props.leftAligned ? " left-0" : " right-0";
        return classname;
    });
    const itemsInnerClass = computed(() => {
        let classname = props.noItemsOverflow ? " " : " overflow-y-auto";
        return classname;
    });

    function show() {
        isVisible.value = true;
        itemsWrapper.value.classList.remove("hidden");
    }

    function hide() {
        isVisible.value = false;
        setTimeout(() => {
            itemsWrapper.value.classList.add("hidden");
        }, 100);
    }

    function onMouseEnter() {
        clearTimeout(hoverTimeout.value);
        show();
    }

    function onMouseLeave() {
        hoverTimeout.value = setTimeout(() => {
            hide();
        }, 300);
    }

    function hideOnClickOutside(event) {
        if (!!itemsWrapper.value) {
            const isClickInsideMenu = itemsWrapper.value.contains(event.target);
            if (!isClickInsideMenu) {
                itemsWrapper.value.classList.add("hidden");
                isVisible.value = false;
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
