import userIcon from "@assets/icons/user.svg";
import ordersIcon from "@assets/icons/orders.svg";
import locationIcon from "@assets/icons/location.svg";
import lockIcon from "@assets/icons/lock.svg";
import logoutIcon from "@assets/icons/logout.svg";

export type ProfileSection = "personal" | "orders" | "addresses" | "password";

interface SidebarItem {
  key: ProfileSection;
  label: string;
  icon: string;
}

interface ProfileSidebarProps {
  active: ProfileSection;
  onSelect: (section: ProfileSection) => void;
  onLogout: () => void;
}

const items: SidebarItem[] = [
  {
    key: "personal",
    label: "Personal Info",
    icon: userIcon,
  },
  {
    key: "orders",
    label: "Order History",
    icon: ordersIcon,
  },
  {
    key: "addresses",
    label: "Saved Addresses",
    icon: locationIcon,
  },
  {
    key: "password",
    label: "Change Password",
    icon: lockIcon,
  },
];

const ProfileSidebar = ({
  active,
  onSelect,
  onLogout,
}: ProfileSidebarProps) => {
  return (
    <aside className="w-full lg:w-65 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 px-6 py-8 border-b border-gray-100">
          <div className="w-20 h-20 rounded-full bg-tomato/10 flex items-center justify-center">
            <span className="text-2xl font-medium text-tomato">JD</span>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-800">John Doe</p>
            <p className="text-xs text-gray-400 mt-0.5">john@example.com</p>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="p-3 flex flex-col gap-1">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors text-left ${
                active === item.key
                  ? "bg-tomato/10 text-tomato font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <img src={item.icon} className="w-4 h-4" alt={item.label} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-50 transition-colors"
          >
            <img src={logoutIcon} className="w-4 h-4" alt="Logout" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
