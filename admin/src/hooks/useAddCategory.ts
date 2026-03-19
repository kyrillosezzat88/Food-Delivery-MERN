import { actAddCategory, actEditCategory } from "@store/category/categorySlice";
import { useAppDispatch } from "@store/hooks";
import type { TCategory } from "@types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  categorySchema,
  type TCategoryInput,
} from "../validation/categoryValidation";

const useAddCategory = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
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
    const file = Array.from(e.target.files ?? []).slice(0, 1)[0];
    setValue("image", file, { shouldValidate: true });
  };

  const onSubmit = (formData: TCategoryInput) => {
    setSubmitting(true);
    clearErrors();
    console.log(formData);
    if (editing) {
      dispatch(actEditCategory(formData))
        .then(() => onClose())
        .finally(() => {
          setSubmitting(false);
          toast.success(`${formData.name} edited successfully `);
        });
    } else {
      // submit logic here
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
          toast.success(`${formData.name} created successfully `);
        });
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return {
    handleFileChange,
    handleSubmit,
    fileInputRef,
    register,
    formErrors: errors,
    onSubmit,
    getValues,
    submitting,
    isActive,
    setValue,
    clearErrors,
    setError,
    setEditing,
  };
};

export default useAddCategory;
