import fs from "node:fs";
import path from "node:path";
import { log } from "node:console";

const __dirname = import.meta.dirname;
const our_dir = path.join(__dirname, "files");
 
if(!fs.existsSync(our_dir)) {
    fs.mkdirSync(our_dir); // создание папки
}

const our_file = path.join(our_dir, "data.txt");
const buf = Buffer.from("Hello from Node.js\n");
//fs.writeFileSync(our_file, buf); // перезаписывает данные
fs.appendFileSync(our_file, buf); // добавляет новые данные

const content = fs.readFileSync(our_file, {encoding: "utf8"})
log(content);

fs.unlinkSync(our_file);
fs.rmSync(our_dir, {recursive: true});