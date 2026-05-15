import { useAppDispatch, useAppSelector } from "@store/hooks";
import CategoryCard from "./CategoryCard";
import { useEffect } from "react";
import { actGetCategories } from "@store/categories/categoriesSlice";

const CategoriesList = () => {
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (!data) {
      dispatch(actGetCategories());
    }
  }, [dispatch, data]);

  if (loading === "pending") {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!data || data.data.length === 0) {
    return <p className="text-center">No categories found.</p>;
  }

  return (
    <div>
      <h1 className="font-bold text-3xl mb-3 text-center">Explore Our Menu</h1>
      <p className="text-center">
        Discover a variety of delicious food categories to satisfy your
        cravings.
      </p>
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {data.data.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
