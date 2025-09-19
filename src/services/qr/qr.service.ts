import { extractQrFromImagePath, extractQrFromPdfPath } from "@utils/qr.utils";
import { QRCode } from "jsqr";
import type { QRCodeParser } from "@utils/qr.utils";
import { ALLOWED_MIME_TYPES } from "@utils/constants";
import { clearUploadDir } from "@utils/upload.utils";

const MIME_TYPES_PARSER_MAP: Record<string, QRCodeParser> = {
  "image/": extractQrFromImagePath,
  "application/pdf": extractQrFromPdfPath,
  default: extractQrFromImagePath,
};

export const extractQrFromFile = async (file: Express.Multer.File) => {
  try {
    const { path, mimetype, filename } = file;

    if (!ALLOWED_MIME_TYPES.some((type) => mimetype.startsWith(type))) {
      throw new Error("Unsupported file type");
    }

    const parser =
      MIME_TYPES_PARSER_MAP[mimetype] ||
      (MIME_TYPES_PARSER_MAP["default"] as QRCodeParser);

    const codes = await parser(path);

    if (!codes.length) {
      throw new Error("No QR code found");
    }

    return codes;
  } finally {
    await clearUploadDir();
  }
};
