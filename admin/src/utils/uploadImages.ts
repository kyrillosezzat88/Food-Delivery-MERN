import type { THandleFileChange } from "@types";
import type { FieldValues, PathValue } from "react-hook-form";

export const handleFileChange = async <T extends FieldValues>({
  e,
  setValue,
  setError,
  clearErrors,
  fieldName,
  uploadType,
}: THandleFileChange<T>) => {
  const files =
    uploadType === "single"
      ? Array.from(e.target.files ?? []).slice(0, 1)[0]
      : Array.from(e.target.files ?? []);
  setValue(fieldName, files as PathValue<T, typeof fieldName>, {
    shouldValidate: true,
  });
};
