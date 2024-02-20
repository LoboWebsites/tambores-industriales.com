import { defineStore } from "pinia";
import { BlogArticleFirebase, Feature, FirebaseImage, ProductFirebase } from "lobowebsites-utils";
import config from "@/lobo.config.json";

export const useConfigStore = defineStore("config", () => {
    const text: Ref<Object> = ref({});
    const img: Ref<FirebaseImage[]> = ref([]);
    const blog: Ref<BlogArticleFirebase> = ref({});
    const ecommerce: Ref<ProductFirebase> = ref({});
    const lang: Ref<String> = ref("");
    const previewElement: Ref<Node | null> = ref(null);

    function $t(page: string, section: string, value: string) {
        const t = text.value?.[page]?.[section]?.[value]?.[lang.value] ?? "?";
        return t;
    }

    function $i(id: number, compressedWidth = null) {
        let image = img.value.find((item) => item.id === id);
        let src = "";
        if (image) {
            src = image.publicFolderFallbackPath;
            if (useRuntimeConfig().public.ENV !== "dev") {
                src = `/api/loboImage?feature=${Feature.images}&id=${image.id}&v=${image.version}`;
                if (typeof compressedWidth === "number") {
                    src += `&compressedWidth=${compressedWidth}`;
                }
            }
        }
        return src;
    }

    function switchLanguage() {
        const path = window.location.pathname;
        const isSecondaryLanguage = path.includes("/" + config.secondaryLanguage);
        console.log(path);
        if (isSecondaryLanguage) {
            const newUrl = "/" + path.replace("/" + config.secondaryLanguage, "");
            window.location.href = newUrl;
        } else {
            const newUrl = "/" + config.secondaryLanguage + path;
            window.location.href = newUrl;
        }
    }

    return {
        text,
        img,
        blog,
        ecommerce,
        lang,
        previewElement,
        $t,
        $i,
        switchLanguage,
    };
});
