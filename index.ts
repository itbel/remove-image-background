import { Config, removeBackground } from "@imgly/background-removal-node";
import * as fs from "fs/promises";
console.clear();

async function processImage(inputPath: string, outputPath: string) {
  console.clear();
  console.log("=====================================");
  try {
    console.log("Reading image from:", inputPath);
    const image = await fs.readFile(inputPath);
    console.clear();
    console.log("Processing image...");
    const blob = await removeBackground(image);
    console.clear();
    console.log("Converting image to buffer...");
    const buffer = Buffer.from(await blob.arrayBuffer());
    console.clear();
    console.log("Saving image to:", outputPath);
    await fs.writeFile(outputPath, buffer);
  } catch (error) {
    console.error("Error processing image:", error);
  } finally {
    console.log("Image processing complete.");
  }
}

let config: Config = {
  output: {
    quality: 1,
    type: "background",
  },
  progress: (key, current, total) => {
    console.clear();
    console.log(`Downloading ${key}: ${current} of ${total}`);
  },
};

processImage("./image1.png", "./output.png");
