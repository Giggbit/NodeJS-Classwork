import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const server = http.createServer((req, res) => {
    fs.readFile(
        path.join(import.meta.dirname, "public", "pages", "index.html"), (err, data) => {
            if(err) {
                res.writeHead(500);
            }
            else {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(data);
            }
            res.end();
        }
    );
});

server.listen(3000, () => {
    console.log("Server is running...");
});