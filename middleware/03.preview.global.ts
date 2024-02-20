export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const previewElementId = to.query.preview?.toString();
        if (previewElementId) {
            const node = document.getElementById(previewElementId);
            if (node) {
                const clone = node.cloneNode(true);
                useConfigStore().previewElement = clone;
                return navigateTo("/lobo/preview");
            }
        }
    }
});
