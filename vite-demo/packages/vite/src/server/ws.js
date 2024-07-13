import { WebSocketServer } from "ws";

export function createWebSocketServer(server, config, httpsOptions) {
    const wss = new WebSocketServer({ noServer: true });
    const wsServer = server;
    const hmrServerWsListener = (req, socket, head) => {
        if (
            req.headers["sec-websocket-protocol"] === "vite-hmr" &&
            req.url === "/"
        ) {
            wss.handleUpgrade(req, socket, head, (ws) => {
                wss.emit("connection", ws, req);
            });
        }
    };
    wsServer.on("upgrade", hmrServerWsListener);

    wss.on("connection", (socket) => {
        console.log("wss connection:", socket);
    });

    wss.on("error", (e) => {
        console.log("wss error:", e);
    });

    return {
        name: "ws",
        on: () => {},
        off: (event, fn) => {
            wss.off(event, fn);
        },
        send(...args) {
            let payload;
            if (typeof args[0] === "string") {
                payload = {
                    type: "custom",
                    event: args[0],
                    data: args[1],
                };
            } else {
                payload = args[0];
            }

            const stringified = JSON.stringify(payload);
            wss.clients.forEach((client) => {
                if (client.readyState === 1) {
                    client.send(stringified);
                }
            });
        },
    };
}
