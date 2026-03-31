import { useState } from "react";

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-tomato transition-colors placeholder:text-gray-300";

const ChangePassword = () => {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPass !== form.confirm) {
      setError("New passwords do not match.");
      return;
    }
    if (form.newPass.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setSaved(true);
    setForm({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setSaved(false), 2500);
  };

  const strength = (p: string) => {
    if (!p) return null;
    if (p.length < 6)
      return { label: "Weak", color: "bg-red-400", width: "w-1/4" };
    if (p.length < 10)
      return { label: "Fair", color: "bg-amber-400", width: "w-2/4" };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p))
      return { label: "Good", color: "bg-blue-400", width: "w-3/4" };
    return { label: "Strong", color: "bg-green-500", width: "w-full" };
  };

  const s = strength(form.newPass);

  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">Change Password</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Choose a strong password to keep your account safe
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="px-6 py-6 flex flex-col gap-5 max-w-md"
      >
        {/* Current Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Current password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              value={form.current}
              onChange={set("current")}
              className={`${inputClass} pr-12`}
              required
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">New password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              value={form.newPass}
              onChange={set("newPass")}
              className={`${inputClass} pr-12`}
              required
            />
          </div>
          {s && (
            <div className="flex flex-col gap-1 mt-1">
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${s.color} ${s.width}`}
                />
              </div>
              <p className={`text-xs ${s.color.replace("bg-", "text-")}`}>
                {s.label} password
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Confirm new password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="••••••••"
              value={form.confirm}
              onChange={set("confirm")}
              className={`${inputClass} pr-24`}
              required
            />
            {form.confirm && (
              <span
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${
                  form.newPass === form.confirm
                    ? "text-green-500"
                    : "text-red-400"
                }`}
              >
                {form.newPass === form.confirm ? "Match" : "No match"}
              </span>
            )}
          </div>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        {/* Tips */}
        <div className="bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-1">
          <p className="text-xs font-medium text-gray-500">Password tips</p>
          {[
            "At least 8 characters",
            "One uppercase letter",
            "One number or symbol",
          ].map((tip) => (
            <p
              key={tip}
              className="text-xs text-gray-400 flex items-center gap-1.5"
            >
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              {tip}
            </p>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-tomato text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-tomato/90 transition-colors"
          >
            Update Password
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
              Password updated
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
