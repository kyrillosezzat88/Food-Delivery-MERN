import { actAddCategory } from "@store/category/categorySlice";
import { useAppDispatch } from "@store/hooks";
import type { TCategory } from "@types";
import React, { useState } from "react";

type CategoryFormData = Omit<TCategory, "id">;

const useAddCategory = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<CategoryFormData>({
    name: "",
    image: "",
    active: true,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategory({ ...category, image: reader.result as string });
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setCategory({ ...category, image: reader.result as string });
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate category name
    if (!category.name || category.name.trim() === "") {
      setError("Category name is required");
      return;
    }

    // Validate image presence
    if (!category.image || category.image.trim() === "") {
      setError("Category image is required");
      return;
    }

    // submit logic here
    console.log("Submitting category:", category);
    dispatch(actAddCategory(category))
      .unwrap()
      .then(() => {
        setError(null);
        onClose();
      })
      .catch((error) => {
        setError(error.message || "Failed to add category");
      });
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return {
    category,
    error,
    handleChange,
    handleFileChange,
    handleDrop,
    handleSubmit,
    fileInputRef,
    setCategory,
  };
};

export default useAddCategory;
