import { firestore } from "~/server/utils/firebase";
import cache from "~/server/utils/cache";
import { ServerHelper } from "lobowebsites-utils";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const cacheKey = ServerHelper.formLoboConfigKey(process.env.WEBSITE_NAME, body.feature);
    const firebaseCollectionName = "loboconfig";

    if (body?.accessToken === process.env.LOBO_ACCESS_TOKEN || process.env.ENV === "dev") {
        if (!body?.config || !body?.feature) {
            throw "Missing required body parameters.";
        } else {
            console.log(`Firestore:  Uploading loboconfig ${body.feature}.`);
            await firestore.doc(`${firebaseCollectionName}/${body.feature}`).set(body.config);
            await cache.setItem(cacheKey, body.config);
        }
    } else {
        throw "Invalid access token.";
    }

    return `Loboconfig of key ${cacheKey} was set.`;
});
