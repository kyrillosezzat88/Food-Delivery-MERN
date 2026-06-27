import { FormField } from "@components/common";
import useAuth from "@hooks/useAuth";

export type TLoginFormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onSubmit: (data: TLoginFormData) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    handleSubmitLogin,
    setLogin,
    loginForm,
    loading,
    error,
    user,
    showPassword,
    setShowPassword,
  } = useAuth({ onSubmitLogin: onSubmit });

  return (
    <form onSubmit={handleSubmitLogin} className="flex flex-col gap-4">
      <FormField
        label="Email address"
        type="email"
        placeholder="john@example.com"
        value={loginForm.email}
        onChange={setLogin("email")}
        required
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-end">
          <button type="button" className="text-xs text-tomato hover:underline">
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <FormField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={loginForm.password}
            onChange={setLogin("password")}
            className="pr-12"
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
