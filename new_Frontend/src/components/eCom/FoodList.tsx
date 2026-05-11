import { useAppDispatch, useAppSelector } from "@store/hooks";
import FoodCard from "./FoodCard";
import { useEffect } from "react";
import { actGetProducts } from "@store/products/actions/actGetProducts";

const FoodList = () => {
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!data) {
      dispatch(actGetProducts());
    }
  }, [dispatch, data]);

  if (loading === "pending") {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }
  if (!data) {
    return <p className="text-gray-500 text-center">No products available</p>;
  }

  return (
    <div className="border-t-2 border-gray-200 pt-6" id="menu">
      <h3 className="font-bold text-xl mb-10">Top Dishes near you</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {data.data?.map((product) => (
          <FoodCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FoodList;
