export default function useLayout() {
    const { xl, lg, md } = useScreen();

    const maxWidth = computed(() => {
        let sectionMaxWidth = xl ? "1200px" : lg ? "900px" : md ? "700px" : "360px";
        let navbarMaxWidth = xl ? "1200px" : lg ? "900px" : md ? "700px" : "360px";

        return {
            section: sectionMaxWidth,
            navbar: navbarMaxWidth,
        };
    });

    const paddingTop = computed(() => {
        let sectionPaddingTop = xl ? "65px" : lg ? "65px" : md ? "50px" : "50px";
        return {
            section: sectionPaddingTop,
        };
    });

    const paddingBottom = computed(() => {
        let sectionPaddingTop = xl ? "65px" : lg ? "65px" : md ? "50px" : "50px";

        return {
            section: sectionPaddingTop,
        };
    });

    return {
        maxWidth,
        paddingBottom,
        paddingTop,
    };
}
