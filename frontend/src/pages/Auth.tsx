import { useEffect, useState } from "react";
import Logo from "@assets/images/logo.png";
import {
  AuthFooter,
  AuthTabs,
  GoogleButton,
  LoginForm,
  SignupForm,
  type AuthMode,
  type TLoginFormData,
  type SignupFormData,
} from "@components/auth";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actLogin, actRegister } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { TUser } from "@components/auth/SignupForm";
import { toast } from "react-toastify/unstyled";
const Auth = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const toggle = (m: AuthMode) => setMode(m);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (token || storedToken) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogin = async (data: TLoginFormData) => {
    console.log("Login:", data);

    try {
      const res = await dispatch(actLogin(data as TUser)).unwrap();

      if (res.user?.isVerified) {
        navigate("/");
      }
    } catch (err) {
      const message = typeof err === "string" ? err : "Login failed.";
      if (message === "Please verify your account before signing in.") {
        toast.error(message);
      }
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    try {
      await dispatch(actRegister(data)).unwrap();
      toast.success("Account created! Please check your email to verify.");
    } catch (err) {
      toast.error("Failed to create account. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="logo" className="h-10" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <AuthTabs mode={mode} onToggle={toggle} />

          <div className="px-8 py-8 flex flex-col gap-5">
            {/* Heading */}
            <div>
              <h1 className="text-xl font-medium text-gray-800">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {mode === "login"
                  ? "Sign in to continue ordering your favourite food"
                  : "Join us and start ordering delicious food"}
              </p>
            </div>

            <GoogleButton />

            {mode === "login" ? (
              <LoginForm onSubmit={handleLogin} setMode={setMode} />
            ) : (
              <SignupForm onSubmit={handleSignup} setMode={setMode} />
            )}

            <AuthFooter mode={mode} onToggle={toggle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
