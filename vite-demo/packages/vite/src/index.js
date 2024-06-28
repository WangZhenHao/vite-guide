// const http = require('http');
// import http from 'http'
import connect from "connect";
import resolveConfig from "./resoveConfig.js";
import htmlFallbackMiddleware from './middlewares/htmlFallbackMiddleware.js'
import indexHtmlMiddleware from './middlewares/indexHtmlMiddleware.js'

async function resolveHttpServer(app) {
    const { createServer } = await import("node:http");
    return createServer(app);
}
async function startServer(server, port) {
    const httpServer = server.httpServer;
    // console.log(httpServer.listen)
    return new Promise((resolve, reject) => {
        httpServer.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
            resolve();
        });
    });
}


async function createServer() {
    const config = resolveConfig();
    const middlewares = connect();

    const httpServer = await resolveHttpServer(middlewares);
    const server = {
        httpServer,
        listen(port = 3000) {
            startServer(server, port);
        },
        config,
    };

    middlewares.use(htmlFallbackMiddleware(server))

    middlewares.use(indexHtmlMiddleware(server));

    server.listen();
}
createServer();
// // 创建一个服务器对象
// const server = http.createServer((req, res) => {
//     // 设置响应头
//     res.writeHead(200, { 'Content-Type': 'text/plain' });

//     // 发送响应数据
//     res.end('Hello, world!\n');
//   });

//   // 监听端口3000
//   const PORT = 3000;
//   server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
