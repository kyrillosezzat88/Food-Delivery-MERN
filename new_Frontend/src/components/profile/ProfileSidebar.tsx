import React from "react";

export type ProfileSection = "personal" | "orders" | "addresses" | "password";

interface SidebarItem {
  key: ProfileSection;
  label: string;
  icon: React.ReactElement;
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
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    key: "orders",
    label: "Order History",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    key: "addresses",
    label: "Saved Addresses",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    key: "password",
    label: "Change Password",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
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
              {item.icon}
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
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
