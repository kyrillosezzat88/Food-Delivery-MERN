import { Apps } from "@components/common";
import { CategoriesList, FoodList, Header } from "@components/eCom";

const Home = () => {
  return (
    <div className="container">
      <div className="flex flex-col gap-20">
        <Header />
        <CategoriesList />
        <FoodList />
        <Apps />
      </div>
    </div>
  );
};

export default Home;
