import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../validation/loginValidation";
import type { TLogin } from "@types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actLogin } from "@store/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, token, loading, error } = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect to dashboard after successful login
  useEffect(() => {
    if (user && user.isAdmin && token) {
      navigate("/dashboard");
    }
  }, [user, token, loading, navigate]);

  const onSubmit = (data: TLogin) => {
    dispatch(actLogin(data));
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    showPassword,
    setShowPassword,
    loading,
    error,
  };
};

export default useLogin;
