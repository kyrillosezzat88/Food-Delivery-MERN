import cloudinary from "../services/cloudinary.js";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

// Upload images to Cloudinary
export const cloudinaryImageUploadMethod = async (
  file: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (
        err: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (err || !result) {
          return reject("Upload image error");
        }

        resolve(result.secure_url);
      },
    );
  });
};
