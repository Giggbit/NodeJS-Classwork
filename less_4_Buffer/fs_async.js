import fs from "node:fs";
import path from "node:path";
import { log } from "node:console";

const __dirname = import.meta.dirname;
const our_dir = path.join(__dirname, "files");

if(!fs.existsSync(our_dir)) {
    fs.mkdirSync(our_dir); 
}
const our_file = path.join(our_dir, "data.txt");
const buf = Buffer.from("Hello from Node.js\n");

fs.writeFile(our_file, buf, (err) => {
    if(err) {
        log(err);
    }
    else {
        fs.readFile(our_file, (err, data) => {
            if(err) {
                log(err);
            }
            else {
                log(data.toString());
            }
        });
    }
});