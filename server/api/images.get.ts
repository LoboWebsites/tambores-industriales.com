import { bucket } from "~/server/utils/firebase";

export default defineEventHandler(async (event) => {
    try {
        const params = getQuery(event);

        console.log(`Firebase Storage:  Getting image from bucket - id: ${params.id}`);
        const file = bucket.file("images/" + params.id);

        // Get the download URL of the image file
        const downloadUrl = await file.getSignedUrl({
            action: "read",
            expires: Date.now() + 60 * 1000,
        });

        // Fetch the image
        const imageBuffer: ArrayBuffer = await event.$fetch(downloadUrl[0], { responseType: "arrayBuffer" });

        // Convert the image content to base64
        const base64Content = Buffer.from(imageBuffer, "binary").toString("base64");
        const image = {
            id: params.id,
            base64: base64Content.replace("dataimage/", "data:image/").replace("base64", ";base64,"),
        };

        return image;
    } catch (err) {
        console.error("Get images has errored:");
        console.error(err);
        return err;
    }
});
