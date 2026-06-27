import { FormField } from "@components/common";
import useAuth from "@hooks/useAuth";
import type { TUser } from "@types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@validations";

interface SignupFormProps {
  onSubmit: (data: TUser) => Promise<void> | void;
  setMode?: (mode: "login" | "signup") => void;
}

const SignupForm = ({ onSubmit, setMode }: SignupFormProps) => {
  const { showPassword, setShowPassword, handleSubmitSignup, loading, error } =
    useAuth({ onSubmitSignup: onSubmit });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  const onFormSubmit = async (data: RegisterFormData) => {
    const success = await handleSubmitSignup(data as TUser);

    if (success) {
      reset();
      setShowPassword(false);
      setMode?.("login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="First name"
          placeholder="John"
          {...register("firstName")}
          required
          error={errors.firstName?.message}
        />

        <FormField
          label="Last name"
          placeholder="Doe"
          {...register("lastName")}
          required
          error={errors.lastName?.message}
        />
      </div>

      <FormField
        label="Email address"
        type="email"
        placeholder="john@example.com"
        {...register("email")}
        required
        error={errors.email?.message}
      />

      <div className="flex flex-col gap-1.5">
        <div className="relative">
          <FormField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            className="pr-12"
            required
            error={errors.password?.message}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2  text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="relative">
          <FormField
            label="Confirm password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="pr-20"
            required
            error={errors.confirmPassword?.message}
          />
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          {...register("agree")}
          className="mt-0.5 accent-tomato"
          required
        />
        {errors.agree && (
          <p className="text-xs text-red-500 mt-1">{errors.agree.message}</p>
        )}
        <span className="text-xs text-gray-500 leading-relaxed">
          I agree to the
          <span className="text-tomato hover:underline cursor-pointer">
            Terms of Service
          </span>
          and
          <span className="text-tomato hover:underline cursor-pointer">
            Privacy Policy
          </span>
        </span>
      </label>

      <button
        type="submit"
        className="w-full cursor-pointer bg-primary text-white py-3 rounded-full text-sm font-medium hover:bg-tomato/90 transition-colors mt-1"
      >
        {loading === "pending" ? "Creating account..." : "Create Account"}
      </button>
      {error && (
        <p className="text-sm text-red-500 mt-2 font-bold bg-red-100 p-4 rounded ">
          {Array.isArray(error)
            ? error.map((e, i) => (
                <span className="block" key={i}>
                  • {e}
                </span>
              ))
            : error}
        </p>
      )}
      {loading === "succeeded" && (
        <p className="text-sm text-green-500 mt-2 font-bold bg-green-100 p-4 rounded text-center">
          Account created successfully please check your email to verify your
          account.
        </p>
      )}
    </form>
  );
};

export default SignupForm;
export type { TUser };
