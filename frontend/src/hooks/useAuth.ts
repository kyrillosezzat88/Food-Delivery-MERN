import type { TLoginFormData } from "@components/auth";
import { actRegister } from "@store/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import type { TUser } from "@types";
import { useState } from "react";
import { toast } from "react-toastify";

type TUseAuthProps = {
  onSubmitSignup?: (data: TUser) => Promise<void> | void;
  onSubmitLogin?: (data: TLoginFormData) => Promise<void> | void;
};

const useAuth = ({ onSubmitSignup, onSubmitLogin }: TUseAuthProps) => {
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [signupForm, setSignupForm] = useState<TUser>({} as TUser);
  const [loginForm, setLoginForm] = useState<TLoginFormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const setSignup =
    (field: keyof TUser) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setSignupForm((prev) => ({
        ...prev,
        [field]: field === "agree" ? e.target.checked : e.target.value,
      }));

  const setLogin =
    (field: keyof TLoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setLoginForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmitSignup = async (data?: Partial<TUser>) => {
    const payload = (data ?? signupForm) as TUser;

    try {
      if (onSubmitSignup) {
        await onSubmitSignup(payload);
      } else {
        await dispatch(actRegister(payload)).unwrap();
      }

      toast.success("Account created! Please check your email to verify.");
      setSignupForm({} as TUser);
      return true;
    } catch (err) {
      toast.error("Failed to create account. Please try again.");
      console.error("Signup error:", err);
      return false;
    }
  };

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmitLogin?.(loginForm);
    setLoginForm({ email: "", password: "" });
  };

  const passwordMatch = signupForm.confirmPassword
    ? signupForm.password === signupForm.confirmPassword
    : null;

  return {
    // shared
    loading,
    error,
    user,
    showPassword,
    setShowPassword,
    // signup
    signupForm,
    setSignup,
    handleSubmitSignup,
    passwordMatch,
    // login
    loginForm,
    setLogin,
    handleSubmitLogin,
  };
};

export default useAuth;
