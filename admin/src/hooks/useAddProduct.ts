import { useAppSelector, useAppDispatch } from "@store/hooks";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../validation/productValidation";
import { actAddProduct } from "@store/item/ProductSlice";
import type { TProductInput } from "../validation/productValidation";
import type { TProduct } from "@types";
import actEditProduct from "@store/item/actions/actEditProduct";

const useAddProduct = ({ onClose }: { onClose: () => void }) => {
  const [submitting, setSubmitting] = useState(false);
  const { error } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
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
  } = useForm<TProductInput>({
    resolver: zodResolver(productSchema),
  });

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useAppSelector((state) => state.categories);

  const isActive = watch("active");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const currentGallery = getValues("gallery") ?? [];
    setValue("gallery", [...currentGallery, ...files], {
      shouldValidate: true,
    });
  };

  const onSubmit = async (formData: TProductInput) => {
    setSubmitting(true);
    clearErrors();

    try {
      const productData: TProduct = {
        ...formData,
        mainImage: formData.gallery?.[0],
        active: formData.active ?? false,
        ...(editing && { _id: getValues("_id") }),
      };

      if (editing) {
        await dispatch(actEditProduct(productData));
        setEditing(false);
      } else {
        await dispatch(actAddProduct(productData));
      }

      onClose();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const removeImage = (index: number) => {
    const currentGallery = getValues("gallery") ?? [];
    const updatedGallery = currentGallery.filter(
      (_: string, i: number) => i !== index,
    );
    setValue("gallery", updatedGallery, { shouldValidate: true });
  };

  return {
    handleFileChange,
    handleSubmit,
    fileInputRef,
    categories,
    categoriesLoading,
    categoriesError,
    register,
    formErrors: errors,
    onSubmit,
    getValues,
    submitting,
    removeImage,
    isActive,
    error,
    setEditing,
    setValue,
  };
};

export default useAddProduct;
