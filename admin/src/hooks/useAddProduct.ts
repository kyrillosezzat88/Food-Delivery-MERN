import { useAppSelector, useAppDispatch } from "@store/hooks";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../validation/productValidation";
import { actAddProduct } from "@store/item/ProductSlice";
import type { TProductInput } from "../validation/productValidation";
import type { TProduct } from "@types";
import { processFiles } from "@utils/uploadImages";

const useAddProduct = ({ onClose }: { onClose: () => void }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();

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
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useAppSelector((state) => state.categories);

  const isActive = watch("active");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    await processFiles(files, {
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ["image/"],
      onError: (message) => setError("gallery", { message }),
      onSuccess: (urls) => {
        const currentGallery = getValues("gallery") ?? [];
        setValue("gallery", [...currentGallery, ...urls], {
          shouldValidate: true,
        });
        clearErrors("gallery");
      },
    });
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer?.files ?? []);
    await processFiles(files, {
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ["image/"],
      onError: (message) => setError("gallery", { message }),
      onSuccess: (urls) => {
        const currentGallery = getValues("gallery") ?? [];
        setValue("gallery", [...currentGallery, ...urls], {
          shouldValidate: true,
        });
        clearErrors("gallery");
      },
    });
  };

  const onSubmit = async (formData: TProductInput) => {
    try {
      setSubmitting(true);
      clearErrors();
      console.log("Form data before submission:", formData);

      // Use the first image as mainImage, rest as gallery
      const gallery = formData.gallery || [];
      const mainImage = gallery[0] || "";

      // Prepare product data for API
      const productData: TProduct = {
        _id: "",
        name: formData.name,
        description: formData.description,
        price: formData.price,
        count: formData.count || 0,
        category: formData.category,
        mainImage,
        gallery: gallery.length > 1 ? gallery.slice(1) : [],
        active: formData.active ?? true,
        createdAt: new Date().toISOString(),
      };

      console.log("Submitting product:", productData);
      const result = await dispatch(actAddProduct(productData));

      if (actAddProduct.fulfilled.match(result)) {
        // Success - close modal
        onClose();
      } else if (actAddProduct.rejected.match(result)) {
        // Show error from API
        const errorMessage = result.payload as string;
        setError("root", {
          type: "manual",
          message: errorMessage || "Failed to add product",
        });
      }
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
    handleDrop,
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
  };
};

export default useAddProduct;
