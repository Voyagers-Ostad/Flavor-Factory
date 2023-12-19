const app = require('./app')
const http = require("http");
const server = http.createServer(app);
const port= process.env.PORT
server.listen(port, function () {
  console.log(`Backend Server Running on ....${port}`);
});