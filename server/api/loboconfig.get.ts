import { firestore } from "~/server/utils/firebase";
import cache from "~/server/utils/cache";
import config from "~/lobo.config.json";
import { ServerHelper } from "lobowebsites-utils";

export default defineEventHandler(async (event) => {
    const params = getQuery(event);
    const cacheKey = ServerHelper.formLoboConfigKey(process.env.WEBSITE_NAME, params.feature);
    let loboconfig = await cache.getItem(cacheKey);

    if (!loboconfig) {
        if (!params?.feature) throw "Invalid query.";

        console.log(`Firestore:  Getting loboconfig ${params.feature}.`);
        loboconfig = (await firestore.doc("loboconfig/" + params.feature).get()).data();

        cache.setItem(cacheKey, loboconfig, { ex: config.configCacheTtlRedis });
    }

    return loboconfig;
});
