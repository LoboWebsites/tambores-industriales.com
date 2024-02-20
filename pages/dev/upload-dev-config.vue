<template>
    <div class="p-8 md:w-1/2">
        <div class="text-xl font-bold mb-8">
            <span class="text-red-400">WARNING:</span>This will replace all the website's content with the local dev
            version (should only be used during development).
        </div>
        <div v-if="featureLoading"><UiSpinner class="mr-2" /> Loading {{ featureLoading }}...</div>
        <div v-else>
            If the website owner has uploaded data of his own it will be erased. Click the button to upload local
            dev.json files and images.
        </div>
        <div class="flex gap-4 mt-8">
            <div v-for="(val, key) of featuresToUpload" class="flex flex-col gap-1">
                <label>{{ key }}</label>
                <UiInput v-model="featuresToUpload[key]" />
            </div>
        </div>
        <UiButton primary @click="uploadConfig" :disabled="loading">Upload</UiButton>
    </div>
</template>

<script setup lang="ts">
    import devText from "~/dev.text.json";
    import devImg from "~/dev.img.json";
    import devBlog from "~/dev.blog.json";
    import devEcommerce from "~/dev.ecommerce.json";
    import {
        Feature,
        LoboImage,
        FirebaseImage,
        DateHelper,
        ProductFirebase,
        LoboHelpers,
        BlogArticleFirebase,
    } from "lobowebsites-utils";

    type File = {
        base64: string;
        sizeMb: string;
    };

    const runtimeConfig = useRuntimeConfig();
    const isDev = computed(() => runtimeConfig.public.ENV === "dev");
    const featureLoading = ref("");
    const loading = ref(false);
    const featuresToUpload = ref({
        text: false,
        images: false,
        blog: false,
        ecommerce: false,
    });

    async function uploadText() {
        const payload = {
            feature: Feature.text,
            config: devText,
        };
        return useFetch("/api/loboconfig", {
            method: "POST",
            body: payload,
        });
    }

    async function uploadImages() {
        let promises = [];
        const delayBetweenCalls = 150;

        // Build Server and Firebase payloads.
        let imagesToUploadByPageFirebase = { items: [] };
        let imagesToUploadByPageBucket: LoboImage[] = [];
        for (const image of devImg.items) {
            const file = await helpers.loadImageAsBase64(image.publicFolderFallbackPath);
            const loboImage: LoboImage = {
                id: image.id,
                base64: file.base64,
            };
            const firebaseImage: FirebaseImage = {
                ...image,
                lastUpdated: DateHelper.getCurrentUTCTimestamp(),
                sizeMb: file.sizeMb,
            };

            imagesToUploadByPageFirebase.items.push(firebaseImage);
            imagesToUploadByPageBucket.push(loboImage);
        }

        // Upload to server memory as base64
        promises.push(
            useFetch("/api/images", {
                method: "POST",
                body: {
                    files: imagesToUploadByPageBucket,
                },
            })
        );

        // Upload to firebase
        await new Promise((resolve) => setTimeout(resolve, delayBetweenCalls));
        promises.push(
            useFetch("/api/loboconfig", {
                method: "POST",
                body: {
                    feature: Feature.images,
                    config: imagesToUploadByPageFirebase,
                },
            })
        );

        return Promise.allSettled(promises);
    }

    async function uploadBlog() {
        let blog: BlogArticleFirebase = JSON.parse(JSON.stringify(devBlog));

        for (const article of blog.items) {
            // Adjust according to what is in the metadata property
            let thumbnailFile = await helpers.loadImageAsBase64(article.thumbnailUrl);
            article.thumbnailUrl = thumbnailFile.base64;

            for (const key of Object.keys(article.metadata.images)) {
                let metadataFile = await helpers.loadImageAsBase64(article.metadata.images[key].base64);
                article.metadata.images[key].base64 = metadataFile.base64;
                useFetch("/api/images", {
                    method: "POST",
                    body: {
                        files: [{ id: article.metadata.images[key].id, base64: metadataFile.base64 }],
                    },
                });
            }

            article.sizeInKb = LoboHelpers.getObjectSizeInKB(article);

            // Clear base64 before uploading to firebase
            for (const key of Object.keys(article.metadata.images)) {
                article.metadata.images[key].base64 = "";
            }
        }

        const payload = {
            feature: Feature.blog,
            config: blog,
        };

        return useFetch("/api/loboconfig", {
            method: "POST",
            body: payload,
        });
    }

    async function uploadEcommerce() {
        let ecommerce: ProductFirebase = JSON.parse(JSON.stringify(devEcommerce));
        for (const product of ecommerce.items) {
            // Upload all images from product
            for (const image of product.images) {
                let imageFile = await helpers.loadImageAsBase64(image.base64);
                useFetch("/api/images", {
                    method: "POST",
                    body: {
                        files: [{ id: image.id, base64: imageFile.base64 }],
                    },
                });
            }

            // Adjust according to what is in the metadata property
            if (product.metadata.images) {
                for (const key of Object.keys(product.metadata.images)) {
                    let metadataFile = await helpers.loadImageAsBase64(product.metadata.images[key].base64);
                    useFetch("/api/images", {
                        method: "POST",
                        body: {
                            files: [{ id: product.metadata.images[key].id, base64: metadataFile.base64 }],
                        },
                    });
                }
            }

            product.sizeInKb = LoboHelpers.getObjectSizeInKB(product);
        }
        const payload = {
            feature: Feature.ecommerce,
            config: devEcommerce,
        };

        return useFetch("/api/loboconfig", {
            method: "POST",
            body: payload,
        });
    }

    async function uploadConfig() {
        if (isDev.value) {
            loading.value = true;
            try {
                if (featuresToUpload.value.text) {
                    featureLoading.value = "Text";
                    await uploadText();
                }

                if (featuresToUpload.value.images) {
                    featureLoading.value = "Images";
                    await uploadImages();
                }

                if (featuresToUpload.value.blog) {
                    featureLoading.value = "Blog";
                    await uploadBlog();
                }

                if (featuresToUpload.value.ecommerce) {
                    featureLoading.value = "Ecommerce";
                    await uploadEcommerce();
                }

                loading.value = false;
                featureLoading.value = "";
            } catch (err) {
                console.error(err);
                loading.value = false;
                featureLoading.value = "";
            }
        }
    }

    const helpers = {
        loadImageAsBase64: async (imagePath: string) => {
            const { data } = await useFetch(`${imagePath}`); // Replace with the actual path
            const blob = data.value;
            const reader = new FileReader();
            return new Promise<File>((resolve) => {
                reader.onload = () => {
                    resolve({
                        base64: reader?.result?.toString() ?? "",
                        sizeMb: (blob.size / (1024 * 1024)).toFixed(2), // Add the file size to the returned object
                    });
                };
                reader.readAsDataURL(blob);
            });
        },
        uploadImagesToBucket: async () => {},
    };

    onBeforeMount(() => {
        if (!isDev.value) navigateTo("/");
    });
</script>
