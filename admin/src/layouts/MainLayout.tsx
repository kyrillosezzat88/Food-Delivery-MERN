import { SideBar, Header, Footer } from "@components/common";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-primary">
      <Header />
      <div className="flex rounded-tl-4xl rounded-tr-4xl bg-white">
        <div className="w-full md:w-1/5 hidden md:block p-10">
          <SideBar />
        </div>
        <div className=" w-full md:w-4/5 py-10">
          <div className="container">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
