import multer, { type StorageEngine } from "multer";
import type { Request } from "express";

// Map MIME types to file extensions
const FILE_TYPE_MAP: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
} as const;

// Better error handling + validation
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    console.log(file);
    const isValid =
      !!FILE_TYPE_MAP[file.mimetype as keyof typeof FILE_TYPE_MAP];

    if (!isValid) {
      const error = new Error(
        `Invalid file type. Allowed: ${Object.keys(FILE_TYPE_MAP).join(", ")}`,
      );
      return cb(error, "");
    }
    // Make sure the folder exists (you can also use `fs.mkdir` beforehand)
    cb(null, "public/uploads/");
  },

  filename: (req: Request, file: Express.Multer.File, cb) => {
    // Clean filename, remove extension, replace spaces & special chars
    const cleanName = file.originalname
      .replace(/\.[^/.]+$/, "") // remove extension
      .replace(/[^a-zA-Z0-9-_]/g, "-") // keep only safe chars
      .replace(/-+/g, "-") // collapse multiple dashes
      .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes

    const ext = FILE_TYPE_MAP[file.mimetype as keyof typeof FILE_TYPE_MAP];
    const uniqueName = `${cleanName}-${Date.now()}.${ext}`;

    cb(null, uniqueName);
  },
});

// Optional: add file size limit (very recommended)
const uploadImages = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default uploadImages;
