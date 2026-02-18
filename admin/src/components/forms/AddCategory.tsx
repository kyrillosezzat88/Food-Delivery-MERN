import { useAddCategory } from "@hooks";
import {
  FormActions,
  FormCheckBox,
  FormField,
  FormSingleImage,
} from "@components/forms";

interface AddCategoryProps {
  onClose: () => void;
}

const AddCategory = ({ onClose }: AddCategoryProps) => {
  const {
    handleFileChange,
    handleDrop,
    handleSubmit,
    fileInputRef,
    register,
    formErrors,
    onSubmit,
    getValues,
    submitting,
    isActive,
  } = useAddCategory({ onClose });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Alert */}
      {formErrors.root && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-700 text-sm font-medium">
            {formErrors.root.message}
          </p>
        </div>
      )}
      <FormField
        label="Category name"
        required
        placeholder="e.g. Curry cut"
        ariaLabel="category name"
        submitting={submitting}
        register={register}
        name="name"
        error={formErrors.name?.message}
      />

      <FormSingleImage
        formErrors={formErrors}
        getValues={getValues}
        handleDrop={handleDrop}
        handleFileChange={handleFileChange}
        submitting={submitting}
        fileInputRef={fileInputRef}
        removeImage={() => {}}
        imageFieldName="image"
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

export default AddCategory;
