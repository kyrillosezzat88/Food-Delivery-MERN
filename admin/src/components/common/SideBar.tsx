import { NavLink } from "react-router-dom";
import Menu from "../../data/Menu.json";
import Icon from "./Icon";

const SideBar = () => {
  return (
    <div className="sticky top-10">
      <ul className="flex flex-col gap-4">
        {Menu.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors",
                  "text-gray-600 hover:bg-gray-50",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "font-medium",
                ].join(" ")
              }
            >
              <Icon name={item.icon} className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
