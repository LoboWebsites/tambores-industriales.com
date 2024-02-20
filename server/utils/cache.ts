import { SetCommandOptions } from "@upstash/redis/types/pkg/commands/set";
import { createClient } from "@vercel/kv";

const kv = createClient({
    url: process.env.KV_REST_API_URL ?? "",
    token: process.env.KV_REST_API_TOKEN ?? "",
});

function getItem(key: string): Promise<string> {
    return new Promise(async (resolve) => {
        const val = await kv.get(key);
        resolve(val as string);
    });
}

function getItemType(key: string) {
    return kv.type(key);
}

function setItem(key: string, val: any, opts: SetCommandOptions = {}) {
    return kv.set(key, JSON.stringify(val), opts);
}

function getKeys(pattern: string = "") {
    return kv.keys(pattern);
}

function deleteKeys(keys: string[]) {
    return kv.del(...keys);
}

const helpers = {
    async findLargerImage(key: string): Promise<string | null> {
        const lastIndex = key.lastIndexOf(".");
        const prefix = key.substring(0, lastIndex + 1); // Get the prefix (images.8.)
        const lastPart = key.substring(lastIndex + 1); // Get the last part (200)

        let matchingKey = null;
        let keys = await getKeys();
        for (const cacheKey of keys) {
            if (
                cacheKey.startsWith(prefix) &&
                cacheKey !== key // Avoid matching the exact same key
            ) {
                const cacheLastPart = cacheKey.substring(lastIndex + 1);
                if (parseInt(cacheLastPart) >= parseInt(lastPart)) {
                    if (!matchingKey || parseInt(cacheLastPart) < parseInt(matchingKey.substring(lastIndex + 1))) {
                        matchingKey = cacheKey;
                    }
                }
            }
        }

        return matchingKey ? getItem(matchingKey) : null;
    },
};

export default {
    getItem,
    getItemType,
    setItem,
    getKeys,
    deleteKeys,
    helpers,
};
