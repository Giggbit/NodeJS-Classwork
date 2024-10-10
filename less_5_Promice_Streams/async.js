import path from "node:path";
import fs from "node:fs";
import { Buffer } from "node:buffer";
const __dirname = import.meta.dirname;
//const __dirname = path.parse(process.argv[1]).dir
const pathToFolder = path.join(__dirname, "files");
const pathToFile = path.join(pathToFolder, "data.txt");

//ENOENT - папки немає

fs.access(pathToFolder, (err) => {
  if (err && err.code !== "ENOENT") {
    console.error(err);
    process.exit();
  }
  if (err !== null) {
    fs.mkdir(pathToFolder, (err) => {
      if (err) {
        console.error(err);
        process.exit();
      }
    });
  }
  const buff = Buffer.from("NodeJS Programm");
  fs.writeFile(pathToFile, buff, (err) => {
    if (err) {
      console.error(err);
      process.exit();
    } else {
      fs.readFile(pathToFile, (err, data) => {
        if (err === null) {
          console.log(data.toString());
        }
      });
    }
  });
});