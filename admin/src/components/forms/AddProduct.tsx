import Icon from "@components/common/Icon";
import { useAddProduct } from "@hooks";

interface AddProductProps {
  onClose: () => void;
}

const AddProduct = ({ onClose }: AddProductProps) => {
  const {
    formErrors,
    handleFileChange,
    handleDrop,
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
  } = useAddProduct({ onClose });

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

      <div>
        <label className="block text-sm font-semibold mb-2">Product name</label>
        <input
          autoFocus
          disabled={submitting}
          {...register("name")}
          className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="e.g. Chicken Curry Cut"
          aria-label="Product name"
        />
        {formErrors.name && (
          <p className="text-red-500 text-sm mt-1">{formErrors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold mb-2">Price</label>
          <input
            type="number"
            step="0.01"
            disabled={submitting}
            className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="e.g. 149.99"
            aria-label="Price"
            {...register("price", { valueAsNumber: true })}
          />
          {formErrors.price && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.price.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            disabled={submitting || categoriesLoading === "pending"}
            {...register("category")}
            className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Category"
          >
            {categoriesLoading === "pending" ? (
              <option>Loading categories...</option>
            ) : categoriesError ? (
              <option>Error loading categories</option>
            ) : (
              <>
                <option value="">Select category</option>
                {categories.data.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </>
            )}
          </select>
          {formErrors.category && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.category.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          disabled={submitting}
          {...register("description")}
          rows={3}
          className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Short description"
        />
        {formErrors.description && (
          <p className="text-red-500 text-sm mt-1">
            {formErrors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Product images <span className="text-red-500">*</span>
        </label>

        {!getValues("gallery") || getValues("gallery").length === 0 ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={submitting ? undefined : handleDrop}
            onClick={() => !submitting && fileInputRef.current?.click()}
            role="button"
            tabIndex={submitting ? -1 : 0}
            onKeyDown={(e) => {
              if (!submitting && (e.key === "Enter" || e.key === " ")) {
                fileInputRef.current?.click();
              }
            }}
            className="flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:shadow-md transition hover:border-primary/70 hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="UploadIcon" className="text-primary w-9 h-9" />
            <div className="text-sm text-gray-600">
              <div className="font-medium text-gray-800">
                Drag & drop or click to upload
              </div>
              <div className="text-xs">
                PNG, JPG up to 5MB (you can add multiple)
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={submitting}
              multiple
            />
          </div>
        ) : (
          <div className="max-h-48 overflow-y-auto p-2 rounded-lg border border-gray-100">
            <div className="grid grid-cols-3 gap-3">
              {getValues("gallery")?.map((src, idx) => (
                <div key={idx} className="relative inline-block">
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className="w-28 h-28 rounded-xl object-cover shadow"
                  />
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => removeImage(idx)}
                    aria-label="Remove image"
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name="TrashIcon" className="text-red-500" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                disabled={submitting}
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-3 p-3 rounded-xl border border-dashed border-gray-200 bg-white hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="UploadIcon" className="text-primary w-6 h-6" />
                <span className="text-sm">Add more</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={submitting}
              multiple
            />
          </div>
        )}

        {formErrors.gallery && (
          <p className="text-red-500 text-sm mt-2">
            {formErrors.gallery.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              disabled={submitting}
              {...register("active")}
              checked={getValues("active") ?? false}
              className="sr-only"
            />
            <div
              className={`w-10 h-6 rounded-full transition-colors ${
                getValues("active") ? "bg-primary" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow transform transition ${
                getValues("active") ? "translate-x-4" : "translate-x-0"
              }`}
            ></div>
          </label>
          <div>
            <div className="text-sm font-medium">Active</div>
            <div className="text-xs text-gray-500">
              Enable this product for ordering
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="cursor-pointer px-4 py-2 rounded-lg border border-gray-200 hover:shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            aria-disabled={submitting}
            className={`cursor-pointer px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
              submitting ? "" : ""
            }`}
          >
            {submitting ? (
              <>
                <span className="animate-spin">⏳</span>
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
