export function useConstants() {
    const { $t } = useConfigStore();
    const websiteLinks = ref([
        {
            name: $t("navigationBar", "links", "home"),
            navigateTo: "/",
        },
        {
            name: $t("navigationBar", "links", "about"),
            navigateTo: "/about",
        },
        {
            name: $t("navigationBar", "links", "contact"),
            navigateTo: "/contact",
        },
        // SUBLINKS EXAMPLE
        // {
        //     name: $t("navigationBar", "links", "features"),
        //     list: [
        //         {
        //             name: $t("navigationBar", "links", "gallery"),
        //             navigateTo: "/features/gallery",
        //         },
        //         {
        //             name: $t("navigationBar", "links", "blog"),
        //             navigateTo: "/features/blog",
        //         },
        //     ],
        // },
    ]);

    const contactLinks = ref([
        {
            name: "Email",
            text: "test@email.com",
            icon: "material-symbols:mail",
            link: "",
        },
        {
            name: "WhatsApp",
            text: "(+xx) xxx xxxxxxx",
            icon: "logos:whatsapp-icon",
            link: "",
        },
        {
            name: "Instagram",
            text: "Instagram",
            icon: "skill-icons:instagram",
            link: "",
        },
        {
            name: "Facebook",
            text: "Facebook",
            icon: "logos:facebook",
            link: "",
        },
        {
            name: "TikTok",
            text: "TikTok",
            icon: "logos:tiktok-icon",
            link: "",
        },
    ]);

    return {
        websiteLinks,
        contactLinks,
    };
}
