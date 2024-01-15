const http = require("http");

const PORT = 8900;
const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end("Benedict Arowojolu-Alagwe");
});

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);
