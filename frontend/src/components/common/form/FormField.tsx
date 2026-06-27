import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-tomato transition-colors placeholder:text-gray-300";

type TInputType = "text" | "email" | "tel" | "password" | "number" | "url";

type FormFieldProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: TInputType;
  className?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>; // support regular input props and RHF register props through standard HTML attrs

const FormField = ({
  label,
  placeholder,
  required = false,
  type = "text",
  className,
  error,
  ...registerProps // 👈 rest are register props (onChange, onBlur, ref, name)
}: FormFieldProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${inputClass} ${className ?? ""}`}
        {...registerProps} // 👈 spread correctly
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
