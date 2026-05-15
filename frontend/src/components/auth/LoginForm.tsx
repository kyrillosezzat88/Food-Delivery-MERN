import { useAppSelector } from "@store/hooks";
import { useState } from "react";

export type TLoginFormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (data: TLoginFormData) => void;
}

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-tomato transition-colors placeholder:text-gray-300";

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState<TLoginFormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const set =
    (field: keyof TLoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
    setForm({ email: "", password: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs text-gray-500">Password</label>
          <button type="button" className="text-xs text-tomato hover:underline">
            Forgot password?
          </button>
        </div>
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

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-full text-sm font-medium hover:bg-tomato/90 transition-colors mt-1"
      >
        {loading === "pending" ? "Signing in..." : "Sign In"}
      </button>
      {error && (
        <p className="text-sm text-red-500 mt-2 font-bold bg-red-100 p-4 rounded text-center">
          {error}
        </p>
      )}
      {user && !user.isVerified && (
        <p className="text-sm text-yellow-600 mt-2 font-bold bg-yellow-100 p-4 rounded text-center">
          Your email is not verified. Please check your inbox.
        </p>
      )}
    </form>
  );
};

export default LoginForm;
