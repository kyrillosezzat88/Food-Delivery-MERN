import { useState } from "react";
import Logo from "@assets/images/logo.png";
import {
  AuthFooter,
  AuthTabs,
  GoogleButton,
  LoginForm,
  SignupForm,
  type AuthMode,
  type LoginFormData,
  type SignupFormData,
} from "@components/auth";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");

  const toggle = (m: AuthMode) => setMode(m);

  const handleLogin = (data: LoginFormData) => {
    console.log("Login:", data);
    // wire up your login logic here
  };

  const handleSignup = (data: SignupFormData) => {
    console.log("Signup:", data);
    // wire up your signup logic here
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
              <LoginForm onSubmit={handleLogin} />
            ) : (
              <SignupForm onSubmit={handleSignup} />
            )}

            <AuthFooter mode={mode} onToggle={toggle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
