import type { TLoading } from "@types";
import type { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface IFormSelect<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: { label: string; value: string }[];
  required?: boolean;
  error?: string;
  submitting?: boolean;
  ariaLabel?: string;
  register: UseFormRegister<T>;
  loading?: TLoading;
}

const FormSelect = <T extends FieldValues>(props: IFormSelect<T>) => {
  const {
    label,
    options,
    required,
    error,
    submitting,
    ariaLabel,
    register,
    name,
    loading,
  } = props;
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        disabled={submitting}
        {...register(name)}
        className="block w-full rounded-xl p-3 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={ariaLabel}
      >
        {loading === "pending" ? (
          <option>Loading ...</option>
        ) : (
          <>
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        )}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormSelect;
