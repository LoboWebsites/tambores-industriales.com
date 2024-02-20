import { Feature, LoboImage, ServerHelper } from "lobowebsites-utils";
import { useHelpers } from "~/composables/useHelpers";
import sharp from "sharp";
import cache from "~/server/utils/cache";
import config from "~/lobo.config.json";

export default defineEventHandler(async (event: any) => {
    const { delay } = useHelpers();
    const params = getQuery(event);
    if (!params.feature || !params.id) {
        throw "Missing 'feature' or 'id' param";
    }

    await delay(Math.floor(Math.random() * 25)); // prevents server overloading

    const compressedWidth: number = !!params.compressedWidth ? parseInt(params.compressedWidth) : 0;
    const cacheKey = ServerHelper.formImageCacheKey(process.env.WEBSITE_NAME, params.id, compressedWidth);
    let imageBuffer: Buffer | null = null;
    let base64: string | null = await cache.getItem(cacheKey);
    let format: string = "";

    if (!base64 && compressedWidth > 0) {
        base64 = await cache.helpers.findLargerImage(cacheKey);
        if (base64) console.log("Found base64 from larger image");
    }

    if (!base64) {
        console.log(`Base 64 not found in storage key ${cacheKey}, getting from firestore bucket.`);
        switch (params.feature) {
            case Feature.images:
                const loboImage: LoboImage = await event.$fetch("/api/images", {
                    params: { id: params.id },
                });
                base64 = loboImage?.base64 ?? null;
                break;
        }
    }

    if (base64) {
        // Image was split into chunks and needs to be reconstructed
        const isSplitIntoChunks = base64.includes("chunks-");
        if (isSplitIntoChunks) {
            let reconstructedBase64 = "";
            const chunksLength = base64.split("-")[1];
            console.log(`Image was split into ${chunksLength} chunks. Reconstructing...`);
            let chunkPromises = [];
            for (let i = 0; i < Number(chunksLength); i++) {
                chunkPromises.push(cache.getItem(cacheKey + "chunk-" + i));
            }
            const responses = await Promise.all(chunkPromises);
            reconstructedBase64 = responses.join("");
            base64 = reconstructedBase64;
        }

        format = "webp";
        imageBuffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), "base64");

        if (imageBuffer) {
            if (compressedWidth > 0) {
                const imageMetadata = await sharp(imageBuffer).metadata();
                const imageWidth = imageMetadata.width || 0;
                if (imageWidth > compressedWidth) {
                    const compressedImageBuffer = await sharp(imageBuffer)
                        .resize({ width: compressedWidth })
                        .toBuffer();
                    imageBuffer = compressedImageBuffer;
                }
            }
            if (!isSplitIntoChunks) {
                cache.setItem(cacheKey, `data:image/${format};base64,${imageBuffer.toString("base64")}`, {
                    ex: config.imagesCacheTtlRedis,
                });
            }

            setHeader(event, "Content-Type", "image/" + format);
            setHeader(event, "Content-Length", imageBuffer.length);
            setHeader(event, "Cache-Control", "max-age=" + config.imagesCacheTtlBrowser);
            console.log(`LoboImage.get returns image of key ${cacheKey}, format ${format}`);
            return imageBuffer;
        }
    }
    throw `base64 or buffer: Feature ${params.feature}, image of key ${cacheKey}`;
});
