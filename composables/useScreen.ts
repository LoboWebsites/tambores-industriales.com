export default function useScreen() {
    const width = ref(0);
    const height = ref(0);

    const xl = computed(() => width.value > 1280);
    const lg = computed(() => width.value > 1024);
    const md = computed(() => width.value > 768);
    const sm = computed(() => width.value > 640);

    const updateScreenSize = () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    };

    onMounted(() => {
        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", updateScreenSize);
    });

    return { width, height, xl, lg, md, sm };
}
