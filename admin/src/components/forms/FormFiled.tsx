import type { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface IFormFiledProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  required?: boolean;
  error?: string;
  submitting?: boolean;
  placeholder?: string;
  ariaLabel?: string;
  register: UseFormRegister<T>;
  tag?: "input" | "textarea";
  type?: React.HTMLInputTypeAttribute;
}

const FormFiled = <T extends FieldValues>({
  label,
  name,
  required,
  error,
  submitting,
  register,
  placeholder,
  ariaLabel,
  tag = "input",
  type = "text",
}: IFormFiledProps<T>) => {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {tag === "textarea" ? (
        <textarea
          disabled={submitting}
          {...register(name)}
          rows={3}
          className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={placeholder}
        />
      ) : (
        <input
          autoFocus
          type={type}
          disabled={submitting}
          {...register(name)} // 👈 dynamic field
          className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={placeholder}
          aria-label={ariaLabel}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormFiled;
