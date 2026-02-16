import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface IFormCheckBox<T extends FieldValues> {
  name: Path<T>;
  label: string;
  subString?: string;
  error?: string;
  submitting: boolean;
  ariaLabel?: string;
  isActive: boolean;
  register: UseFormRegister<T>;
}
const FromCheckBox = <T extends FieldValues>(props: IFormCheckBox<T>) => {
  const {
    name,
    label,
    subString,
    error,
    submitting,
    ariaLabel,
    isActive,
    register,
  } = props;
  return (
    <div className="flex items-center gap-3">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          disabled={submitting}
          {...register(name)}
          checked={isActive ?? false}
          className="sr-only "
          aria-label={ariaLabel}
        />
        <div
          className={`w-10 h-6 rounded-full transition-colors ${
            isActive ? "bg-primary" : "bg-gray-200"
          }`}
        ></div>
        <div
          className={`absolute left-1 w-4 h-4 bg-white rounded-full shadow transform transition ${
            isActive ? "translate-x-4" : "translate-x-0"
          }`}
        ></div>
      </label>
      <div>
        <div className="text-sm font-medium">{label}</div>
        {subString && <div className="text-xs text-gray-500">{subString}</div>}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FromCheckBox;
