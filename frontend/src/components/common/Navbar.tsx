import Logo from "@images/logo.png";
import BasketIcon from "@assets/icons/basket_icon.png";
import SearchIcon from "@assets/icons/search_icon.png";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import Logout from "@assets/icons/logout.svg";
import { logout } from "@store/auth/authSlice";
const Navbar = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="container">
      <div className="flex justify-between gap-4 py-9">
        <Link to="/" className="text-2xl font-bold">
          <img src={Logo} />
        </Link>
        <div className="gap-4 hidden md:flex text-xl">
          <Link to="/" className="hover:text-gray-700">
            Home
          </Link>
          <a href="#menu" className="hover:text-gray-700">
            Menu
          </a>
          <Link to="/contact" className="hover:text-gray-700">
            Contact
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          <img src={SearchIcon} />
          <Link to="/cart" className="relative">
            <img src={BasketIcon} />
            {Object.keys(items).length > 0 ? (
              <span className="absolute top-0 -right-2 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center"></span>
            ) : null}
          </Link>
          {token ? (
            <div className="flex items-center gap-1">
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 flex items-center"
              >
                Welcome {user?.firstName}
                {user?.profileImage && (
                  <img
                    src={user?.profileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full ml-2"
                  />
                )}
              </Link>
              <button className=" cursor-pointer" onClick={handleLogout}>
                <img src={Logout} alt="Logout" className="w-8 h-8" />
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <button className="btn-primary">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
