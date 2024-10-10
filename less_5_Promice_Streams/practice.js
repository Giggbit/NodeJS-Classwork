import fs from "node:fs/promises";
import path from "node:path";
import { Buffer } from "node:buffer";
import { error } from "node:console";

const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname, "Files");
const pathToFile = path.join(pathToFolder, "file.txt");

async function addBufferFile() {
    try {
        await fs.mkdir(pathToFolder);
        const buf = Buffer.from("Hello from Node.js!");
        await fs.writeFile(pathToFile, buf);
    }
    catch (error) {
        console.error(error);
    }
};

async function readFileAndPrint() {
    try {
        const data = await fs.readFile(pathToFile);
        console.log(`Data: ${data}`);
    }
    catch (error) {
        console.log(error);
    }
}

async function main() {
    await addBufferFile();
    await readFileAndPrint();
}

main();