export function useHelpers() {
    function preloadImageElement(finalImageSrc: string, imageElement: HTMLElement, imageSrcWhileLoading?: string) {
        return new Promise((resolve) => {
            const preloaded = new Image();
            if (imageElement) {
                imageElement.src = imageSrcWhileLoading ? imageSrcWhileLoading : "";
                preloaded.onload = () => {
                    imageElement.src = finalImageSrc;
                    resolve(true);
                };
                preloaded.src = finalImageSrc;
            } else {
                console.warn("Preload Image - image element is null");
                resolve(false);
            }
        });
    }

    function preloadImage(src: string) {
        return new Promise((resolve) => {
            const preloaded = new Image();
            preloaded.onload = () => resolve(true);
            preloaded.src = src;
        });
    }

    function findKeyByValue(obj: object, valueToFind: any) {
        const keys = Object.keys(obj);
        const foundKey = keys.find((key) => obj[key] === valueToFind);
        const index = keys.indexOf(foundKey);

        return index;
    }

    function getImageFormatFromBase64(base64string: string) {
        if (!base64string) throw "getImageFormatFromBase64: Invalid base64string.";
        const format = base64string.match(/^data:image\/(.*?);base64,/)[1];
        return format;
    }

    function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function getStringSizeInBytes(str: string) {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(str);
        return bytes.length;
    }

    return {
        preloadImageElement,
        preloadImage,
        findKeyByValue,
        getImageFormatFromBase64,
        delay,
        getStringSizeInBytes,
    };
}
