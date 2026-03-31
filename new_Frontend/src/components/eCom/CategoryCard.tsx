import FoodCategory from "@assets/images/food_category.png";

const CategoryCard = () => {
  return (
    <div className="group flex flex-col items-center justify-center cursor-pointer">
      <img
        src={FoodCategory}
        alt="Food Category"
        className="w-28 h-28 object-cover rounded-full transition-all duration-300 group-hover:border-6 group-hover:border-primary group-hover:scale-90"
      />
      <h2 className="mt-2 font-semibold text-xl text-gray-500 transition-colors duration-300 group-hover:text-black">
        Sushi
      </h2>
    </div>
  );
};

export default CategoryCard;
