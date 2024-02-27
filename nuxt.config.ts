import tailwindConfig from "./tailwind.config";

export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@nuxt/image-edge", "@pinia/nuxt", "nuxt-icon"],

    app: {
        head: {
            script: [],
            style: [{ children: tailwindConfig.cssRootVars, type: "text/css" }],
            meta: [
                // Open Graph Meta Tags
                { property: "og:title", content: "Tambores Industriales" },
                {
                    property: "og:description",
                    content: "Tambores abiertos, tambores cerrados, contenedores de plástico. Bogotá.",
                },
                { property: "og:image", content: "/logo-1.svg" },
                { property: "og:url", content: "www.tamboresindustriales.com" },
                { property: "og:type", content: "website" },

                // Twitter Meta Tags
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: "Tambores Industriales" },
                {
                    name: "twitter:description",
                    content: "Tambores abiertos, tambores cerrados, contenedores de plástico. Bogotá.",
                },
                //{ name: "twitter:image", content: "/logo-1.svg" },
            ],
        },
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/global.scss" as *;',
                },
            },
        },
    },

    runtimeConfig: {
        public: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
            FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
            ENV: process.env.ENV,
            BASE_URL: process.env.BASE_URL,
        },
    },

    image: {
        dir: "public",
    },
});
