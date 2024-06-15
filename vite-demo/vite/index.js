const connect = require('connect')
const { createServer } = require('http');

// 创建一个服务器对象
const server = http.createServer((req, res) => {
    // 设置响应头
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    
    // 发送响应数据
    res.end('Hello, world!\n');
  });
  
  // 监听端口3000
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
