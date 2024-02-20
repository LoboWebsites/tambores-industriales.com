import loboConfig from "~/lobo.config.json";
export default defineEventHandler((event) => {
    setResponseHeader(event, "Access-Control-Allow-Credentials", "true");
    setResponseHeader(event, "Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");

    const allowedOrigins = loboConfig.allowedOrigins;
    if (process.env.ENV === "dev") {
        allowedOrigins.push("http://localhost:3001");
    }

    const origin = event.node.req.headers.origin ?? "";
    if (allowedOrigins.includes(origin)) {
        setResponseHeader(event, "Access-Control-Allow-Origin", origin);
        setResponseHeader(
            event,
            "Access-Control-Allow-Headers",
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        );
    }

    if (event.node.req.method === "OPTIONS") {
        return "OK";
    }
});
