import fs from "node:fs";
import { log } from "node:console";
import { Buffer } from "node:buffer";

// const content = fs.readFileSync("data.txt");
// log(content);

// const buffer = Buffer.alloc(8);
// buffer.write("Hello World");
// console.log(buffer);

const buf1 = Buffer.from("asd");
const buf2 = Buffer.from("asew");
// buf1.copy(buf2);
// log(buf2.toString());
log(buf1.compare(buf2));



