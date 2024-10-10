// const simple = (val) => {
//   return new Promise((resolve, reject) => {
//     if (val > 0) resolve("val>0");
//     else reject("val<=0");
//   });
// };

// simple(-100)
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

import path from "node:path";
import fs from "node:fs/promises";
import { Buffer } from "node:buffer";
const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname, "files");
const pathToFile = path.join(pathToFolder, "data.txt");
const buff = Buffer.from("Hello Node js");
fs.writeFile(pathToFile, buff)
    .then(() => {
        fs.readFile(pathToFile)
            .then((data) => console.log(data.toString()));
    });

// fs.access(pathToFolder)
//   .then(()=>{
//     fs.mkdir(pathToFolder)
//         .then()
//         .catch()
//   })
//   .catch((err) => {
//     console.error(err);
//   });