import { useId } from "react";

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-tomato transition-colors placeholder:text-gray-300";

type TInputType = "text" | "email" | "tel" | "password" | "number" | "url";

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: TInputType;
  className?: string;
  error?: string;
  onBlur?: () => void;
};

const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  className,
  error,
  onBlur,
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
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        className={`${inputClass} ${className ?? ""}`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
