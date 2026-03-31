import Logo from "@images/logo.png";
import BasketIcon from "@assets/icons/basket_icon.png";
import SearchIcon from "@assets/icons/search_icon.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="container">
      <div className="flex justify-between gap-4 py-9">
        <div className="text-2xl font-bold">
          <img src={Logo} />
        </div>
        <div className="gap-4 hidden md:flex text-xl">
          <Link to="/" className="hover:text-gray-700">
            Home
          </Link>
          <Link to="/menu" className="hover:text-gray-700">
            Menu
          </Link>
          <Link to="/contact" className="hover:text-gray-700">
            Contact
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          <img src={SearchIcon} />
          <Link to="/cart">
            <img src={BasketIcon} />
          </Link>
          <Link to="/auth">
            <button className="btn-primary">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
