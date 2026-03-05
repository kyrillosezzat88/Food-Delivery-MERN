import { Icon } from "@components/common";
import React from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormGetValues,
} from "react-hook-form";

type TFormGallery<T extends FieldValues> = {
  formErrors: FieldErrors<T>;
  getValues: UseFormGetValues<T>;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void | Promise<void>;
  submitting: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  removeImage: (index: number) => void;
  FieldName: Path<T>;
  type: "single" | "multi";
  formName: string;
};

const FormUpload = <T extends FieldValues>({
  formErrors,
  getValues,
  handleFileChange,
  submitting,
  fileInputRef,
  removeImage,
  FieldName,
  type = "single",
  formName,
}: TFormGallery<T>) => {
  const uploadedFiles = getValues(FieldName) as File | File[];

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {formName} image{type === "multi" && "s"}
        <span className="text-red-500">*</span>
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={submitting}
        multiple={type === "multi"}
        name={FieldName}
      />
      {!uploadedFiles || uploadedFiles.length < 1 ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !submitting && fileInputRef.current?.click()}
          role="button"
          tabIndex={submitting ? -1 : 0}
          onKeyDown={(e) => {
            if (!submitting && (e.key === "Enter" || e.key === " ")) {
              fileInputRef.current?.click();
            }
          }}
          className="flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:shadow-md transition hover:border-primary/70 hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="UploadIcon" className="text-primary w-9 h-9" />

          <div className="text-sm text-gray-600">
            <div className="font-medium text-gray-800">
              Drag & drop or click to upload
            </div>
            <div className="text-xs">
              PNG, JPG up to 5MB (you can add multiple)
            </div>
          </div>
        </div>
      ) : (
        <div className="max-h-48 overflow-y-auto p-2 rounded-lg border border-gray-100">
          <div className="grid grid-cols-3 gap-3">
            {type === "multi" ? (
              <>
                {Array.isArray(uploadedFiles) &&
                  uploadedFiles.map((src, idx) => (
                    <div key={idx} className="relative inline-block">
                      <img
                        src={
                          typeof src === "string"
                            ? src
                            : URL.createObjectURL(src)
                        }
                        alt={`preview-${idx}`}
                        className="w-28 h-28 rounded-xl object-cover shadow"
                      />

                      <button
                        type="button"
                        disabled={submitting}
                        onClick={() => removeImage(idx)}
                        aria-label="Remove image"
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Icon name="TrashIcon" className="text-red-500" />
                      </button>
                    </div>
                  ))}

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-3 p-3 rounded-xl border border-dashed border-gray-200 bg-white hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="UploadIcon" className="text-primary w-6 h-6" />
                  <span className="text-sm">Add more</span>
                </button>
              </>
            ) : (
              <div className="relative inline-block">
                <img
                  src={
                    typeof uploadedFiles === "string"
                      ? uploadedFiles
                      : URL.createObjectURL(uploadedFiles)
                  }
                  alt="preview-image"
                  className="w-28 h-28 rounded-xl object-cover shadow"
                />

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => removeImage(0)}
                  aria-label="Remove image"
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon name="TrashIcon" className="text-red-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {formErrors[FieldName]?.message && (
        <p className="text-red-500 text-sm mt-2">
          {formErrors[FieldName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormUpload;
