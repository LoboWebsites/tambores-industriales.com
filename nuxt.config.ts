import tailwindConfig from "./tailwind.config";

export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@nuxt/image-edge", "@pinia/nuxt", "nuxt-icon"],

    app: {
        head: {
            script: [],
            style: [{ children: tailwindConfig.cssRootVars, type: "text/css" }],
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
