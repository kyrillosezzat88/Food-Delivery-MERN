import type {
  UseFormSetValue,
  UseFormSetError,
  Path,
  UseFormClearErrors,
  FieldValues,
} from "react-hook-form";

export type THandleFileChange<T extends FieldValues> = {
  e: React.ChangeEvent<HTMLInputElement>;
  setValue: UseFormSetValue<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  fieldName: Path<T>;
  uploadType: "multi" | "single";
};
