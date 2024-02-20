import { bucket } from "~/server/utils/firebase";
import { LoboImage, ServerHelper } from "lobowebsites-utils";
import { useHelpers } from "~/composables/useHelpers";
import cache from "~/server/utils/cache";
import sharp from "sharp";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { getImageFormatFromBase64 } = useHelpers();
    let cacheKey = "";

    if (body?.accessToken === process.env.LOBO_ACCESS_TOKEN || process.env.ENV === "dev") {
        if (!body?.files) throw "Missing files.";

        // Save the new files to firebase storage folder
        const imageFiles: LoboImage[] = body.files;
        for (const file of imageFiles) {
            // Optimize image by converting to webp
            const imageBuffer = Buffer.from(file.base64.replace(/^data:image\/\w+;base64,/, ""), "base64");
            const webpBuffer = await sharp(imageBuffer).toFormat("webp").toBuffer();
            const webpBase64 = webpBuffer.toString("base64");
            file.base64 = webpBase64;

            console.log(`Firestore:  Uploading image (id: ${file.id}) to bucket.`);
            await bucket.file("images/" + file.id).save(imageBuffer, {
                metadata: {
                    contentType: "image/webp",
                },
            });

            // Remove all cached images with this id and set the new one
            cacheKey = ServerHelper.formImageCacheKey(process.env.WEBSITE_NAME, file.id);
            const keys = await cache.getKeys();
            let keysToDelete: string[] = [];
            for (const key of keys) {
                const lastIndex = cacheKey.lastIndexOf(".");
                const result = cacheKey.substring(0, lastIndex);
                if (key.includes(result)) {
                    keysToDelete.push(key);
                }
            }
            cache.deleteKeys(keysToDelete);

            // Split image in chunks if greater than 1mb
            const chunkSize = 1000000; // Vercel KV limit is 1mb
            const base64Size = useHelpers().getStringSizeInBytes(file.base64);
            if (base64Size > chunkSize) {
                const chunks = [];
                const loops = Math.ceil(base64Size / chunkSize);
                for (let i = 0; i < loops; i++) {
                    const start = i * chunkSize;
                    const end = (i + 1) * chunkSize;
                    const chunk = file.base64.substring(start, end);
                    chunks.push(chunk);
                    cache.setItem(cacheKey + "chunk-" + i, chunk);
                }
                cache.setItem(cacheKey, "chunks-" + chunks.length);
            } else {
                cache.setItem(cacheKey, file.base64);
            }
        }
    } else {
        throw "Invalid access token.";
    }

    return `Loboconfig of key ${cacheKey} was set.`;
});
