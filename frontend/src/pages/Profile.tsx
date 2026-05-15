import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChangePassword,
  OrderHistory,
  PersonalInfo,
  ProfileSidebar,
  SavedAddresses,
  type ProfileSection,
} from "@components/profile";

const sectionMap: Record<ProfileSection, JSX.Element> = {
  personal: <PersonalInfo />,
  orders: <OrderHistory />,
  addresses: <SavedAddresses />,
  password: <ChangePassword />,
};

const Profile = () => {
  const [active, setActive] = useState<ProfileSection>("personal");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-800">My Profile</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your account details and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <ProfileSidebar
            active={active}
            onSelect={setActive}
            onLogout={handleLogout}
          />
          <div className="flex-1 w-full">{sectionMap[active]}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
