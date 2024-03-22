export function useConstants() {
    const { $t } = useConfigStore();
    const websiteLinks = ref([
        {
            name: $t("barraDeNavegación", "links", "inicio"),
            navigateTo: "/#top",
        },
        {
            name: $t("barraDeNavegación", "links", "servicios"),
            navigateTo: "/servicios",
        },
        {
            name: $t("barraDeNavegación", "links", "contáctanos"),
            navigateTo: "/contactanos",
            isCta: true,
        },
        {
            name: $t("barraDeNavegación", "links", "trabajaConNosotros"),
            navigateTo: "/trabaja-con-nosotros",
        },
    ]);

    const contactLinks = ref([
        {
            name: "NIT",
            text: "NIT 800045660-7",
            icon: "icon-park-solid:id-card",
            link: "",
        },
        {
            name: "Email",
            text: "sandra.tamind@gmail.com",
            icon: "material-symbols:mail",
            link: "",
        },
        {
            name: "Teléfono",
            text: "601 781 6856",
            icon: "material-symbols:call-sharp",
            link: "",
        },
        {
            name: "Ubicación",
            text: "Carrera 4 No. 10-123 Sur Soacha",
            icon: "material-symbols:location-on",
            link: "",
        },
    ]);

    return {
        websiteLinks,
        contactLinks,
    };
}
