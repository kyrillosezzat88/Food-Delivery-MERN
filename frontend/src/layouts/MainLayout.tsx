import { Footer, Navbar } from "@components/common";
import ScrollToHash from "@utils/scrollToHash";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ScrollToHash />
      <Footer />
    </div>
  );
};

export default MainLayout;
