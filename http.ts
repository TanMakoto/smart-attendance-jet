const indexHtml = Bun.file("index.html");
const styleCss = Bun.file("style.css");
const scriptJs = Bun.file("script.js");

Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/") return new Response(indexHtml);
        if (url.pathname === "/style.css") {
            return new Response(styleCss, { headers: { "Content-Type": "text/css" } });
        }
        if (url.pathname === "/script.js") {
            return new Response(scriptJs, { headers: { "Content-Type": "application/javascript" } });
        }
        return new Response("Not Found", { status: 404 });
    },
});
console.log("Listening on http://localhost:3000");
