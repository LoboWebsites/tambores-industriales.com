interface Toast {
    message: string;
    type: ToastType;
    hide?: Boolean;
    link?: ToastLink;
    onRemove?: Function;
}

type ToastLink = {
    text: string;
    action: Function;
};

enum ToastType {
    warning = "warning",
    error = "error",
    success = "success",
    default = "default",
}

const toastList: Ref<Toast[]> = ref([]);
let removeTimeout: any = null;

export function useToast() {
    function showLangChangeToast(currentLang: "es" | "en") {
        let message =
            currentLang == "es"
                ? "You are seeing the spanish version of the page."
                : "Estás viendo la versión en inglés de la página.";

        let link =
            currentLang == "es"
                ? {
                      action: () => {
                          window.localStorage.setItem("lang-alert", "en");
                          window.location.href = window.location.href.includes("?")
                              ? window.location.href.replace(/#([^?/]+)([/?].*|$)/, "") + "&lang=en"
                              : window.location.href.replace(/#([^?/]+)([/?].*|$)/, "") + "?lang=en";
                      },
                      text: "Would you like to see the english version?",
                  }
                : {
                      action: () => {
                          window.localStorage.setItem("lang-alert", "es");
                          window.location.href = window.location.href.includes("?")
                              ? window.location.href.replace(/#([^?/]+)([/?].*|$)/, "") + "&lang=es"
                              : window.location.href.replace(/#([^?/]+)([/?].*|$)/, "") + "?lang=es";
                      },
                      text: "¿Quieres ver la versión en español?",
                  };

        let onRemove = () => window.localStorage.setItem("lang-alert", currentLang);
        addToast(message, ToastType.default, 0, link, onRemove);
    }

    function addToast(
        message: string,
        type: ToastType,
        duration: number = 3000,
        link?: ToastLink,
        onRemove?: Function
    ) {
        clearTimeout(removeTimeout);

        const toast: Toast = {
            message,
            type,
            link,
            onRemove,
        };
        toastList.value.push(toast);
        if (duration !== 0) {
            removeTimeout = setTimeout(() => {
                removeToast(toast, true);
            }, duration);
        }
    }

    function removeToast(toast: Toast, skipOnRemove = false) {
        if (toast.onRemove && !skipOnRemove) {
            toast.onRemove();
        }

        clearTimeout(removeTimeout);
        toastList.value.map((t) => (t.message === toast.message ? (t.hide = true) : (t.hide = false)));
        setTimeout(() => {
            toastList.value = toastList.value.filter((t) => t.message !== toast.message);
        }, 1000);
    }

    return {
        toastList,
        ToastType,
        addToast,
        removeToast,
        showLangChangeToast,
    };
}
