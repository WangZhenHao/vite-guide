const importMetaUrl = new URL(import.meta.url);

const socketHost = `ws://${importMetaUrl.hostname}:${importMetaUrl.port}`;

function handleMessage(data) {
    console.log(data);
}
function setupWebSocket() {
    const socket = new WebSocket(socketHost, 'vite-hmr');
    // const socket = new WebSocket("ws://localhost:3000");
    socket.addEventListener("open", () => {
        console.log("vite:ws:connect");
    });

    socket.addEventListener("message", async ({ data }) => {
        handleMessage(JSON.parse(data));
    });

    socket.addEventListener("close", async ({ wasClean }) => {
        console.log(`[vite] server connection lost. polling for restart...`);
    });
}

setupWebSocket();
