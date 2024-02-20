import devText from "@/dev.text.json";
import devImg from "@/dev.img.json";
import config from "@/lobo.config.json";
import { Feature } from "lobowebsites-utils";

export default defineNuxtRouteMiddleware(async (to, from) => {
    let queryLang = from.query.lang ? from.query.lang : to.query.lang;
    let lang = config.languages.includes(queryLang) ? queryLang : config.primaryLanguage;

    if (process.server) {
        const config = useRuntimeConfig();
        const configStore = useConfigStore();

        if (from.query.lang) to.query.lang = from.query.lang;

        let text = devText;
        let img = devImg.items;

        // PROD ONLY - set data from firebase
        if (config.public.ENV !== "dev") {
            const textPromise = useFetch("/api/loboconfig", {
                method: "GET",
                query: {
                    feature: Feature.text,
                },
            });

            const imgPromise = useFetch("/api/loboconfig", {
                method: "GET",
                query: {
                    feature: Feature.images,
                },
            });

            const [textResponse, imgResponse] = await Promise.all([textPromise, imgPromise]);

            text = textResponse.data.value ?? {};
            img = imgResponse.data.value?.items ?? {};
        }

        configStore.text = text;
        configStore.img = img;
        configStore.lang = lang;
    }
});
