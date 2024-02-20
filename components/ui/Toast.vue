<template>
    <ClientOnly>
        <div class="flex flex-col gap-4 fixed top-12 right-24 z-50">
            <div
                v-for="toast of toastComp.toastList.value"
                data-aos="fade-left"
                class="relative flex gap-2 p-4 pr-8 overflow-hidden bg-white z-50 w-96 rounded-md items-center shadow-md"
                :class="{ 'opacity-0': toast.hide }"
            >
                <div
                    class="h-full w-1 absolute top-0 left-0 bg-blue-300"
                    :class="{
                        '!bg-green-300': toast.type === toastComp.ToastType.success,
                        '!bg-yellow-400': toast.type === toastComp.ToastType.warning,
                        '!bg-red-400': toast.type === toastComp.ToastType.error,
                    }"
                ></div>
                <Icon
                    name="carbon:close"
                    size="24"
                    class="cursor-pointer absolute top-2 right-2"
                    @click="toastComp.removeToast(toast)"
                />
                <Icon
                    :name="getIconType(toast.type)"
                    size="28"
                    class="text-blue-300"
                    :class="{
                        '!text-green-300': toast.type === toastComp.ToastType.success,
                        '!text-yellow-400': toast.type === toastComp.ToastType.warning,
                        '!text-red-400': toast.type === toastComp.ToastType.error,
                    }"
                />
                <div>
                    <span class="text-sm">{{ toast.message }}</span>
                    <p v-if="toast.link">
                        <span
                            class="cursor-pointer text-sm underline text-blue-400"
                            @click="
                                () => {
                                    toast.link.action();
                                    toastComp.removeToast(toast, true);
                                }
                            "
                        >
                            {{ toast.link.text }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
    const toastComp = useToast();

    function getIconType(type) {
        switch (type) {
            case toastComp.ToastType.success:
                return "ep:success-filled";
            case toastComp.ToastType.warning:
                return "ph:warning-circle-duotone";
            case toastComp.ToastType.error:
                return "ph:warning-circle-duotone";
            default:
                return "material-symbols:info-rounded";
        }
    }
</script>
