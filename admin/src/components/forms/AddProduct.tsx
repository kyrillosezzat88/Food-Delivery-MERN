import Icon from "@components/common/Icon";
import { useAddProduct } from "@hooks";

interface AddProductProps {
  onClose: () => void;
}

const categories = [
  { id: 2, name: "Leg Piece" },
  { id: 3, name: "Boneless" },
  { id: 4, name: "Normal cut" },
  { id: 5, name: "Curry cut" },
  { id: 6, name: "Wings" },
  { id: 7, name: "Lollipop" },
];

const AddProduct = ({ onClose }: AddProductProps) => {
  const {
    product,
    setProduct,
    error,
    handleChange,
    handleFileChange,
    handleDrop,
    handleSubmit,
    fileInputRef,
  } = useAddProduct({ onClose });

  const isDisabled =
    !product?.name ||
    product.name.trim() === "" ||
    product.price === "" ||
    Number(product.price) <= 0 ||
    !product?.images ||
    product.images.length === 0;

  const removeImage = (index: number) => {
    setProduct({
      ...product,
      images: product.images.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">Product name</label>
        <input
          autoFocus
          onChange={handleChange}
          value={product.name}
          name="name"
          className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          placeholder="e.g. Chicken Curry Cut"
          aria-label="Product name"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold mb-2">Price</label>
          <input
            onChange={handleChange}
            value={String(product.price === "" ? "" : product.price)}
            name="price"
            type="number"
            min={0}
            step="0.01"
            className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            placeholder="e.g. 149.99"
            aria-label="Price"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            name="categoryId"
            value={product.categoryId ?? ""}
            onChange={handleChange}
            className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            aria-label="Category"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          name="description"
          onChange={handleChange}
          value={product.description}
          rows={3}
          className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          placeholder="Short description"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Product images <span className="text-red-500">*</span>
        </label>

        {!product?.images || product.images.length === 0 ? (
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
              multiple
            />
          </div>
        ) : (
          <div className="max-h-48 overflow-y-auto p-2 rounded-lg border border-gray-100">
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((src, idx) => (
                <div key={idx} className="relative inline-block">
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className="w-28 h-28 rounded-xl object-cover shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    aria-label="Remove image"
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-red-50 transition"
                  >
                    <Icon name="TrashIcon" className="text-red-500" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-3 p-3 rounded-xl border border-dashed border-gray-200 bg-white hover:shadow-sm"
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
              multiple
            />
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
              checked={product?.active}
              onChange={() =>
                setProduct({ ...product, active: !product?.active })
              }
              className="sr-only"
            />
            <div
              className={`w-10 h-6 rounded-full transition-colors ${
                product?.active ? "bg-primary" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow transform transition ${
                product?.active ? "translate-x-4" : "translate-x-0"
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

      {error && !/image|file|size/i.test(String(error)) && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
};

export default AddProduct;
