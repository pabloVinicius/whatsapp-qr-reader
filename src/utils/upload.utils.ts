import fs from "fs/promises";
import { UPLOAD_DIR } from "./constants";

export const createUploadDir = async () => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error("Error creating upload directory:", error);
  }
};

export const clearUploadDir = async () => {
  try {
    await fs.rm(UPLOAD_DIR, { recursive: true, force: true });
    await createUploadDir();
  } catch (error) {
    console.error("Error clearing upload directory:", error);
  }
};
