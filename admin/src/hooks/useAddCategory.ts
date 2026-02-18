import { actAddCategory } from "@store/category/categorySlice";
import { useAppDispatch } from "@store/hooks";
import type { TCategory } from "@types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categorySchema,
  type TCategoryInput,
} from "../validation/categoryValidation";
import { processFiles } from "@utils/uploadImages";

const useAddCategory = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<TCategory>({
    resolver: zodResolver(categorySchema),
  });

  const isActive = watch("active");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 1);
    await processFiles(files, {
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ["image/"],
      onError: (message) => setError("image", { message }),
      onSuccess: ([url]) => {
        setValue("image", url, { shouldValidate: true });
        clearErrors("image");
      },
    });
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer?.files ?? []).slice(0, 1);
    await processFiles(files, {
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ["image/"],
      onError: (message) => setError("image", { message }),
      onSuccess: ([url]) => {
        setValue("image", url, { shouldValidate: true });
        clearErrors("image");
      },
    });
  };

  const onSubmit = (formData: TCategoryInput) => {
    setSubmitting(true);
    clearErrors();

    // submit logic here
    console.log("Submitting category:", formData);
    dispatch(actAddCategory(formData))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((err) => {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";

        setError("root", {
          type: "manual",
          message: errorMessage,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return {
    handleFileChange,
    handleDrop,
    handleSubmit,
    fileInputRef,
    register,
    formErrors: errors,
    onSubmit,
    getValues,
    submitting,
    isActive,
  };
};

export default useAddCategory;
