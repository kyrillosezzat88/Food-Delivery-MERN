import { Icon } from "@components/common";
import React from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormGetValues,
} from "react-hook-form";

type TFormSingleImage<T extends FieldValues> = {
  formErrors: FieldErrors<T>;
  getValues: UseFormGetValues<T>;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitting: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  removeImage: (index: number) => void;
  imageFieldName: Path<T>; // <-- dynamic field name
};

const FormSingleImage = <T extends FieldValues>({
  formErrors,
  getValues,
  handleDrop,
  handleFileChange,
  submitting,
  fileInputRef,
  removeImage,
  imageFieldName,
}: TFormSingleImage<T>) => {
  const uploadedImg = (getValues(imageFieldName) as string) ?? null;

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        Product images <span className="text-red-500">*</span>
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={submitting}
        multiple
      />
      {!uploadedImg ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={submitting ? undefined : handleDrop}
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
            <div className="text-xs">PNG, JPG up to 5MB</div>
          </div>
        </div>
      ) : (
        <div className="max-h-48 overflow-y-auto p-2 rounded-lg border border-gray-100">
          <div className="relative inline-block">
            <img
              src={uploadedImg}
              alt={`preview-img`}
              className="w-28 h-28 rounded-xl object-cover shadow"
            />

            <button
              type="button"
              disabled={submitting}
              onClick={() => null}
              aria-label="Remove image"
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="TrashIcon" className="text-red-500" />
            </button>
          </div>
        </div>
      )}

      {formErrors[imageFieldName]?.message && (
        <p className="text-red-500 text-sm mt-2">
          {formErrors[imageFieldName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormSingleImage;
