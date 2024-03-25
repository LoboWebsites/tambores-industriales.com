export default function useScreen() {
    const width = ref(0);
    const height = ref(0);
    const scrollY = ref(0);

    const xl = computed(() => width.value > 1280);
    const lg = computed(() => width.value > 990);
    const md = computed(() => width.value > 768);
    const sm = computed(() => width.value > 520);

    const updateScreenSize = () => {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
    };

    const updateScrollPosition = () => {
        scrollY.value = window.scrollY;
    };

    onMounted(() => {
        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
        window.addEventListener("scroll", updateScrollPosition);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", updateScreenSize);
        window.removeEventListener("scroll", updateScrollPosition);
    });

    return { width, height, xl, lg, md, sm, scrollY };
}
