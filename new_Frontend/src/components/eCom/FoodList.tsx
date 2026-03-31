import FoodCard from "./FoodCard";

const FoodList = () => {
  return (
    <div className="border-t-2 border-gray-200 pt-6">
      <h3 className="font-bold text-xl mb-10">Top Dishes near you</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </div>
    </div>
  );
};

export default FoodList;
