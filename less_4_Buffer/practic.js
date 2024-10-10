import fs from "node:fs";
import path from "node:path";
import { log } from "node:console";

// task 1
const file = path.join("data.txt");
const buf = Buffer.from("Hello Node.JS!");
fs.appendFileSync(file, buf);
log(buf.toString());

// task 2
const file_2 = path.join("dt.txt");
const buf_2 = Buffer.from("It's me))");
fs.appendFileSync(file_2, buf_2);
const content = fs.readFileSync(file_2, {encoding: "utf-8"});
log(content);

// task 3
const buffer = Buffer.from("something...");
console.log("Buffer: ", buffer);

const outputString = buffer.toString();
console.log("String from buffer: ", outputString);

// task 4
const buf_a = Buffer.from("Hello ");
const buf_b = Buffer.from("World!");
const con_buf = Buffer.concat([buf_a, buf_b]);
const file_4 = path.join("task_4.txt");
fs.writeFileSync(file_4, con_buf);
