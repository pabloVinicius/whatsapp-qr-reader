import app from "@app";
import { createUploadDir } from "@utils/upload.utils";

const PORT = process.env.PORT || 3000;

(async () => {
  await createUploadDir();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
