import fs from "fs/promises";
import path from "path";
import { pdf } from "pdf-to-img";
import { UPLOAD_DIR, PDF_RESOLUTION_CONVERT_SCALE } from "./constants";

export const convertPdfToImages = async (imagePath: string) => {
  const document = await pdf(imagePath, {
    scale: PDF_RESOLUTION_CONVERT_SCALE,
  });

  const imagesPaths = [];
  let counter = 0;

  for await (const page of document) {
    const pagePath = path.join(UPLOAD_DIR, `page${counter}.png`);
    await fs.writeFile(pagePath, page);
    imagesPaths.push(pagePath);
    counter++;
  }

  console.log("Converted PDF to images:", imagesPaths);

  return imagesPaths;
};
