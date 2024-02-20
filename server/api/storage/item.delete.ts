import cache from "~/server/utils/cache";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return cache.deleteKeys(body.keys);
});
