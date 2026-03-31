import { useState } from "react";

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-tomato transition-colors placeholder:text-gray-300";

const PersonalInfo = () => {
  const [form, setForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    bio: "",
  });
  const [saved, setSaved] = useState(false);

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

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
            <span className="text-xl font-medium text-tomato">JD</span>
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
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">First name</label>
            <input
              value={form.firstName}
              onChange={set("firstName")}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-500">Last name</label>
            <input
              value={form.lastName}
              onChange={set("lastName")}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Email address</label>
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Phone number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">
            Bio <span className="text-gray-300">(optional)</span>
          </label>
          <textarea
            value={form.bio}
            onChange={set("bio") as any}
            rows={3}
            placeholder="Tell us a little about yourself..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-tomato transition-colors placeholder:text-gray-300 resize-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="bg-tomato text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-tomato/90 transition-colors"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Saved successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
