import { Jimp } from "jimp";
import jsQR, { QRCode } from "jsqr";
import { convertPdfToImages } from "./pdf.utils";
import { pdf } from "pdf-to-img";

export interface QRCodeParser {
  (path: string): Promise<Array<QRCode | null>>;
}

export const extractQrFromImagePath: QRCodeParser = async (path: string) => {
  const image = await Jimp.read(path);
  const { data, width, height } = image.bitmap;
  const code = jsQR(new Uint8ClampedArray(data), width, height);

  return [code];
};

export const extractQrFromPdfPath: QRCodeParser = async (path: string) => {
  const pdfPagesImages = await convertPdfToImages(path);

  const codes = (
    await Promise.all(pdfPagesImages.map(extractQrFromImagePath))
  ).flat();

  return codes;
};
