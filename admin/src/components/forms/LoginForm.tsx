import { LogoIcon } from "@assets/icons";
import { useLogin } from "@hooks";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    showPassword,
    setShowPassword,
    loading,
    error,
  } = useLogin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-lg">
            <LogoIcon />
            <h1 className="text-2xl font-bold text-primary">Fresh Food</h1>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to your admin account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Error Message */}
            {(error || errors.email || errors.password) && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <span className="text-red-500 font-bold text-lg">×</span>
                <p className="text-sm text-red-700">
                  {error || errors.email?.message || errors.password?.message}
                </p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading === "pending"}
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading === "pending"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading === "pending"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading === "pending"}
                />
                <span className="text-gray-700">Remember me</span>
              </label>
              <a
                href="#"
                className="text-primary hover:text-primary/80 font-medium transition"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading === "pending"}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading === "pending" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-500">Admin Portal</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Info Message */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-700">
              <strong>Demo Credentials:</strong> Use your admin email and
              password to log in.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>© 2024 Fresh Food Admin. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
