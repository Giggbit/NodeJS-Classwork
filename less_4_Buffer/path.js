import path from "node:path";
import { log } from "node:console";

const __dirname = import.meta.dirname;
log(path.sep);
log(path.resolve(__dirname, "files", "data.txt"));
log(path.join("big", "data", "db.json"));
log(path.resolve("big", "data", "db.json"));
