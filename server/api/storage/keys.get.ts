import cache from "~/server/utils/cache";
export default defineEventHandler(async (event) => {
    const params = getQuery(event);
    return cache.getKeys(params.pattern);
});
