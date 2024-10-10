import fs from "node:fs";
import path from "node:path";

const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname, "Files");
const pathToDataFile = path.join(pathToFolder, "data.txt");
const pathToInfoFile = path.join(pathToFolder, "info.txt");

const readStream = fs.createReadStream(pathToDataFile);
const writeStream = fs.createWriteStream(pathToInfoFile);

readStream.on("data", (chunk) => {
    console.log(`Chunk start...\n`);
    console.log(chunk.toString());
    console.log(`\nChunk end...\n`);

    // writeStream.write(chunk, (err) => {});
    readStream.pause();
    setTimeout(() => {
        readStream.resume();
    }, 3000);
});

readStream.on("open", () => {
    console.log("File was opened");
});
readStream.on("close", () => {
    console.log("File was closed");
});
readStream.on("end", () => {
    console.log("File end");
});