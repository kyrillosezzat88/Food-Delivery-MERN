import { useEffect } from "react";
import { useAddProduct } from "@hooks";
import {
  FormField,
  FormSelect,
  FormCheckBox,
  FormActions,
  FormUpload,
} from "@components/forms";
import type { TProduct } from "@types";

interface AddProductProps {
  onClose: () => void;
  product?: TProduct | null;
}

const AddProduct = ({ onClose, product }: AddProductProps) => {
  const {
    formErrors,
    handleFileChange,
    handleSubmit,
    fileInputRef,
    categories,
    register,
    categoriesLoading,
    onSubmit,
    getValues,
    removeImage,
    submitting,
    isActive,
    error,
    setValue,
    setEditing,
  } = useAddProduct({ onClose });

  useEffect(() => {
    if (!product) return;

    setEditing(true);

    // Set all fields except category (handled separately)
    const { category, ...rest } = product;
    (Object.keys(rest) as (keyof typeof rest)[]).forEach((key) => {
      setValue(key, rest[key]);
    });

    // Always use the category ID, not the full object
    setValue("category", category._id);
  }, [product, setValue, setEditing]);

  const categoryOptions = categories?.data.map((c) => ({
    label: c.name,
    value: c._id,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Alert */}
      {(formErrors.root || error) && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-700 text-sm font-medium">
            {formErrors.root?.message ?? error}
          </p>
        </div>
      )}

      {/* Product Name */}
      <FormField
        label="Product name"
        name="name"
        placeholder="e.g. Chicken Curry Cut"
        ariaLabel="Product name"
        error={formErrors.name?.message}
        register={register}
        submitting={submitting}
        required
      />

      {/* Price & Category */}
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Price"
          name="price"
          type="number"
          placeholder="e.g. 149.99"
          ariaLabel="Price"
          error={formErrors.price?.message}
          register={register}
          submitting={submitting}
          required
        />
        <FormSelect
          label="Category"
          name="category"
          options={categoryOptions}
          ariaLabel="Category"
          error={formErrors.category?.message}
          register={register}
          submitting={submitting}
          loading={categoriesLoading}
          required
        />
      </div>

      {/* Description */}
      <FormField
        label="Description"
        name="description"
        tag="textarea"
        placeholder="Write a short description about this product"
        ariaLabel="Description"
        error={formErrors.description?.message}
        register={register}
        submitting={submitting}
        required
      />

      {/* Gallery Upload */}
      <FormUpload
        formErrors={formErrors}
        getValues={getValues}
        handleFileChange={handleFileChange}
        fileInputRef={fileInputRef}
        removeImage={removeImage}
        submitting={submitting}
        FieldName="gallery"
        type="multi"
        formName="Product"
      />

      {/* Footer: Active toggle + Actions */}
      <div className="flex items-center justify-between">
        <FormCheckBox
          name="active"
          label="Active"
          subString="Enable this product for ordering"
          ariaLabel="active"
          register={register}
          submitting={submitting}
          isActive={isActive ?? false}
        />
        <FormActions
          onClose={onClose}
          submitting={submitting}
          btnSubmitText="Save"
          LoadingText="Saving..."
        />
      </div>
    </form>
  );
};

export default AddProduct;
