import { LogoIcon } from "@assets/icons"
import { Link } from "react-router-dom";
import user from "@assets/images/profile.png";
const Header = () => {
  return (
    <div className="bg-primary text-white py-4">
        <div className="container">
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 w-1/3">
                    <LogoIcon />
                    <h1 className="text-2xl font-bold">Fresh Food</h1>
                </Link>
                <input type="text" placeholder="Search" className=" w-1/3 p-2 rounded-md bg-white text-primary border-none outline-none" />
                <div className="flex items-center justify-end  gap-2 w-1/3 text-white cursor-pointer">
                    <img src={user} alt="user" className="w-10 h-10 rounded-full" />
                    <span>John Doe</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header