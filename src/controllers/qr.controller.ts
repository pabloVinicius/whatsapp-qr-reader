import { Request, Response } from "express";
import { extractQrFromFile } from "@services/qr";

export const getQrFromFile = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const codes = await extractQrFromFile(req.file);

    if (codes.length > 0) {
      const codesData = codes.map((code, index) => ({
        data: code?.data,
        page: index + 1,
      }));
      res.json({
        message: "Code found",
        data: {
          codes: codesData,
        },
      });
    }
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};
