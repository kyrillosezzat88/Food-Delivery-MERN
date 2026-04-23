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
};

const FormField = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  className,
}: FormFieldProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs text-gray-500">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${inputClass} ${className ?? ""}`}
      />
    </div>
  );
};

export default FormField;
