import { useAddProduct } from "@hooks";
import {
  FormField,
  FormSelect,
  FormCheckBox,
  FormActions,
  FormUpload,
} from "@components/forms";

interface AddProductProps {
  onClose: () => void;
}

const AddProduct = ({ onClose }: AddProductProps) => {
  const {
    formErrors,
    handleFileChange,
    handleSubmit,
    fileInputRef,
    categories,
    register,
    categoriesLoading,
    categoriesError,
    onSubmit,
    getValues,
    removeImage,
    submitting,
    isActive,
    error,
  } = useAddProduct({ onClose });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Alert */}
      {(formErrors.root || error) && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-700 text-sm font-medium">
            {formErrors.root?.message || error}
          </p>
        </div>
      )}
      <FormField
        label="Product name"
        required
        error={formErrors.name?.message}
        placeholder="e.g. Chicken Curry Cut"
        ariaLabel="Product name"
        submitting={submitting}
        register={register}
        name="name"
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Price"
          required
          error={formErrors.price?.message}
          placeholder="e.g. 149.99"
          ariaLabel="Price"
          submitting={submitting}
          register={register}
          name="price"
          type="number"
        />
        <FormSelect
          label="Category"
          options={categories.data.map((c) => ({
            label: c.name,
            value: c._id,
          }))}
          required
          error={formErrors.category?.message}
          ariaLabel="Category"
          submitting={submitting}
          register={register}
          name="category"
        />
      </div>

      <FormField
        label="Description"
        required
        error={formErrors.description?.message}
        placeholder="Write a short description about this product"
        ariaLabel="Description"
        submitting={submitting}
        register={register}
        name="description"
        tag="textarea"
      />

      <FormUpload
        formErrors={formErrors}
        getValues={getValues}
        handleFileChange={handleFileChange}
        submitting={submitting}
        fileInputRef={fileInputRef}
        removeImage={removeImage}
        FieldName="gallery"
        type="multi"
        formName="Product"
      />

      <div className="flex items-center justify-between">
        <FormCheckBox
          name="active"
          label="Active"
          subString="Enable this product for ordering"
          register={register}
          submitting={submitting}
          isActive={isActive ?? false}
          ariaLabel="active"
        />

        <FormActions
          onClose={onClose}
          submitting={submitting}
          btnSubmitText="Save"
          LoadingText="saving..."
        />
      </div>
    </form>
  );
};

export default AddProduct;
