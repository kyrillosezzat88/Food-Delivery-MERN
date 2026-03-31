import { useState } from "react";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
}

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-tomato transition-colors placeholder:text-gray-300";

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [form, setForm] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const set =
    (field: keyof SignupFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({
        ...form,
        [field]: field === "agree" ? e.target.checked : e.target.value,
      });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const passwordMatch = form.confirmPassword
    ? form.password === form.confirmPassword
    : null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">First name</label>
          <input
            placeholder="John"
            value={form.firstName}
            onChange={set("firstName")}
            className={inputClass}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-500">Last name</label>
          <input
            placeholder="Doe"
            value={form.lastName}
            onChange={set("lastName")}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-gray-500">Email address</label>
        <input
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={set("email")}
          className={inputClass}
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-gray-500">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.password}
            onChange={set("password")}
            className={`${inputClass} pr-12`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-gray-500">Confirm password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={set("confirmPassword")}
            className={`${inputClass} pr-20`}
            required
          />
          {passwordMatch !== null && (
            <span
              className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs ${
                passwordMatch ? "text-green-500" : "text-red-400"
              }`}
            >
              {passwordMatch ? "Match" : "No match"}
            </span>
          )}
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.agree}
          onChange={set("agree")}
          className="mt-0.5 accent-tomato"
          required
        />
        <span className="text-xs text-gray-500 leading-relaxed">
          I agree to the{" "}
          <span className="text-tomato hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-tomato hover:underline cursor-pointer">
            Privacy Policy
          </span>
        </span>
      </label>

      <button
        type="submit"
        className="w-full bg-tomato text-white py-3 rounded-full text-sm font-medium hover:bg-tomato/90 transition-colors mt-1"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
export type { SignupFormData };
