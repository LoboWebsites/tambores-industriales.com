export function useConstants() {
    const { $t } = useConfigStore();
    const websiteLinks = ref([
        {
            name: $t("barraDeNavegación", "links", "inicio"),
            navigateTo: "/",
        },
        {
            name: $t("barraDeNavegación", "links", "servicios"),
            navigateTo: "/servicios",
        },
        {
            name: $t("barraDeNavegación", "links", "contáctanos"),
            navigateTo: "/contactanos",
        },
        {
            name: $t("barraDeNavegación", "links", "trabajaConNosotros"),
            navigateTo: "/trabaja-con-nosotros",
        },
    ]);

    const contactLinks = ref([
        {
            name: "Email",
            text: "test@email.com",
            icon: "material-symbols:mail",
            link: "",
        },
        {
            name: "Teléfono",
            text: "781 6856 - 711 4232",
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
