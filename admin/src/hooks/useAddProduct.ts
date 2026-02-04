import React, { useState } from "react";

type ProductFormData = {
  name: string;
  images: string[];
  price: number | "";
  categoryId?: number | null;
  description?: string;
  active: boolean;
};

const readFileAsDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const useAddProduct = ({ onClose }: { onClose: () => void }) => {
  const [product, setProduct] = useState<ProductFormData>({
    name: "",
    images: [],
    price: "",
    categoryId: null,
    description: "",
    active: true,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "price") {
      const parsed = value === "" ? "" : Number(value);
      setProduct({ ...product, [name]: parsed });
    } else if (name === "categoryId") {
      setProduct({ ...product, [name]: value ? Number(value) : null });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate sizes and types
    for (const f of files) {
      if (!f.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }
      if (f.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
    }

    try {
      const urls = await Promise.all(files.map(readFileAsDataURL));
      setProduct({ ...product, images: [...product.images, ...urls] });
      setError(null);
    } catch {
      setError("Failed to read files");
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length === 0) return;

    // Filter images
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    for (const f of imageFiles) {
      if (f.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
    }

    try {
      const urls = await Promise.all(imageFiles.map(readFileAsDataURL));
      setProduct({ ...product, images: [...product.images, ...urls] });
      setError(null);
    } catch {
      setError("Failed to read files");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.name || product.name.trim() === "") {
      setError("Product name is required");
      return;
    }

    if (product.price === "" || Number(product.price) <= 0) {
      setError("Valid product price is required");
      return;
    }

    if (!product.images || product.images.length === 0) {
      setError("At least one product image is required");
      return;
    }

    // submit logic here
    console.log("Submitting product:", product);
    setError(null);
    onClose();
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return {
    product,
    setProduct,
    error,
    handleChange,
    handleFileChange,
    handleDrop,
    handleSubmit,
    fileInputRef,
  };
};

export default useAddProduct;
