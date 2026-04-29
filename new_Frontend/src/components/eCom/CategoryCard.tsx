import FoodCategory from "@assets/images/food_category.png";
import type { TCategory } from "@types";

interface CategoryCardProps {
  category: TCategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { name, image } = category;

  const imageSrc =
    typeof image === "string"
      ? image
      : image
        ? URL.createObjectURL(image)
        : FoodCategory;

  return (
    <div className="group flex flex-col items-center justify-center cursor-pointer">
      <img
        src={imageSrc}
        alt={name}
        className="w-28 h-28 object-cover rounded-full transition-all duration-300 group-hover:border-6 group-hover:border-primary group-hover:scale-90"
      />
      <h2 className="mt-2 font-semibold text-sm  transition-colors duration-300 group-hover:text-black">
        {name}
      </h2>
    </div>
  );
};

export default CategoryCard;
