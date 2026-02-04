import Icon from "@components/common/Icon";
import { useAddCategory } from "@hooks";

interface AddCategoryProps {
  onClose: () => void;
}

const AddCategory = ({ onClose }: AddCategoryProps) => {
  const {
    category,
    setCategory,
    error,
    handleChange,
    handleFileChange,
    handleDrop,
    handleSubmit,
    fileInputRef,
  } = useAddCategory({ onClose });

  const isDisabled =
    !category?.name || category.name.trim() === "" || !category?.image;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">
          Category name
        </label>
        <input
          autoFocus
          onChange={handleChange}
          value={category.name}
          className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          placeholder="e.g. Curry cut"
          aria-label="Category name"
          name="name"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Category image <span className="text-red-500">*</span>
        </label>

        {!category?.image ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                fileInputRef.current?.click();
              }
            }}
            className="flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer hover:shadow-md transition hover:border-primary/70 hover:bg-primary/5"
          >
            <Icon name="UploadIcon" className="text-primary w-9 h-9" />
            <div className="text-sm text-gray-600">
              <div className="font-medium text-gray-800">
                Drag & drop or click to upload
              </div>
              <div className="text-xs">PNG, JPG up to 5MB</div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative inline-block">
            <img
              src={category?.image}
              alt="preview"
              className="w-36 h-36 rounded-xl object-cover shadow"
            />
            <button
              type="button"
              onClick={() => {
                setCategory({ ...category, image: "" });
              }}
              aria-label="Remove image"
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-50 transition"
            >
              <Icon name="TrashIcon" className="text-red-500" />
            </button>
          </div>
        )}

        {error && /image|file|size/i.test(String(error)) && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={category?.active}
              onChange={() =>
                setCategory({ ...category, active: !category?.active })
              }
              className="sr-only"
            />
            <div
              className={`w-10 h-6 rounded-full transition-colors ${
                category?.active ? "bg-primary" : "bg-gray-200"
              }`}
            />
            <div
              className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow transform transition ${
                category?.active ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </label>
          <div>
            <div className="text-sm font-medium">Active</div>
            <div className="text-xs text-gray-500">
              Enable this category for ordering
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-lg border border-gray-200 hover:shadow-sm transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isDisabled}
            aria-disabled={isDisabled}
            className={`cursor-pointer px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:opacity-95 transition ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCategory;
