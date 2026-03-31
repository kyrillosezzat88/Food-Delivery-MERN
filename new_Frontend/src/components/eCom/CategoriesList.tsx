import CategoryCard from "./CategoryCard";

const CategoriesList = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-3 text-center">Explore Our Menu</h1>
      <p className="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
        exercitationem excepturi temporibus obcaecati voluptas vitae?
      </p>
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  );
};

export default CategoriesList;
