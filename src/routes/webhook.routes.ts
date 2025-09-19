import { getQrFromFile } from "@controllers/qr.controller";
import { UPLOAD_DIR } from "@utils/constants";
import { Router } from "express";
import multer from "multer";

const router = Router();

const upload = multer({ dest: UPLOAD_DIR });

router.post("/", upload.single("image"), getQrFromFile);

export default router;
