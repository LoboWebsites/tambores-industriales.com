const theme = {
    darkMode: "class",
    extend: {
        colors: {
            primary: "#749be5",
            primarySold: "#a17978",
            secondary: "#e8f4fc",
            background: "#fafafa",
            "primary-text": "#3b475a",
            "secondary-text": "white",
        },
    },
    screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
    },
};

const cssRootVars = (() => {
    let css = ":root {\n";
    for (const colorKey in theme.extend.colors) {
        const colorValue = theme.extend.colors[colorKey];
        if (typeof colorValue === "object") {
            for (const shadeKey in colorValue) {
                const shadeValue = colorValue[shadeKey];
                css += `  --${colorKey}-${shadeKey}: ${shadeValue};\n`;
            }
        } else {
            css += `  --${colorKey}: ${colorValue};\n`;
        }
    }

    for (const screenKey in theme.screens) {
        const screenValue = theme.screens[screenKey];
        css += `  --${screenKey}: ${screenValue};\n`;
    }

    css += "}";

    return css;
})();

export default {
    theme,
    cssRootVars,
};
