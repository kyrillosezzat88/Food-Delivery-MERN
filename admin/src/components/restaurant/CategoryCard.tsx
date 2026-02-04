import type { TCategoryCard } from "@types";

const CategoryCard = ({ id, name, active, image }: TCategoryCard) => {
  return (
    <button
      key={id}
      className={`flex flex-col items-center justify-between w-24 h-24 rounded-2xl border bg-white text-xs font-medium shrink-0 shadow-sm ${
        active
          ? "border-primary bg-primary/5 text-primary"
          : "border-gray-100 text-gray-700 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center justify-center w-12 h-12 mt-3 rounded-full bg-gray-900 overflow-hidden">
        {/* Placeholder circle image */}
        <span className="w-8 h-8 rounded-full bg-gray-700" />
      </div>
      <span className="mb-3 text-[11px] leading-tight text-center px-1">
        {name}
      </span>
    </button>
  );
};

export default CategoryCard;
