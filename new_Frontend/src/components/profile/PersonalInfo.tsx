import { FormField } from "@components/common";
import { actUpdateUser } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import type { TUser } from "@types";
import { useEffect, useEffectEvent, useState } from "react";
import checkMark from "@assets/icons/checkMark.svg";

type TForm = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
};

const PersonalInfo = () => {
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<TForm | null>(user);
  const [saved, setSaved] = useState(false);

  const updateProfile = useEffectEvent((user: TUser) => {
    setForm(user);
  });
  useEffect(() => {
    if (user) {
      updateProfile(user);
    }
  }, [user]);

  const handleFieldChange =
    (field: keyof TForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }) as TForm);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(actUpdateUser(form as TUser)).then(() => {
      setSaved(true);
    });
  };

  const initials = form
    ? `${form.firstName?.[0] || ""}${form.lastName?.[0] || ""}`.toUpperCase() ||
      "U"
    : "U";

  if (!form) {
    return <div>Loading...</div>; // Or a proper loading state
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">
          Personal Information
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Update your personal details here
        </p>
      </div>

      <form onSubmit={handleSave} className="px-6 py-6 flex flex-col gap-5">
        {/* Avatar Upload */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-tomato/10 flex items-center justify-center flex-shrink-0">
            {form.profileImage ? (
              <img
                src={form.profileImage}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-xl font-medium text-tomato">
                {initials}
              </span>
            )}
          </div>
          <div>
            <button
              type="button"
              className="text-sm text-tomato border border-tomato px-4 py-1.5 rounded-full hover:bg-tomato/5 transition-colors"
            >
              Change photo
            </button>
            <p className="text-xs text-gray-400 mt-1">JPG or PNG, max 2MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="First name"
            value={form.firstName}
            onChange={handleFieldChange("firstName")}
            placeholder="Enter your first name"
            required
          />
          <FormField
            label="Last name"
            value={form.lastName}
            onChange={handleFieldChange("lastName")}
            placeholder="Enter your last name"
            required
          />
        </div>
        <FormField
          label="Email address"
          value={form.email}
          onChange={handleFieldChange("email")}
          type="email"
          placeholder="you@example.com"
          required
        />

        <FormField
          label="Phone number"
          value={form.phoneNumber || ""}
          onChange={handleFieldChange("phoneNumber")}
          type="tel"
          placeholder="Enter your phone number"
        />

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-tomato/90 transition-colors"
          >
            {loading === "pending" ? "Saving..." : "Save Changes"}
          </button>
          {saved && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <img src={checkMark} alt="Success" className="w-4 h-4 " />
              Saved successfully
            </span>
          )}
        </div>
      </form>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default PersonalInfo;
