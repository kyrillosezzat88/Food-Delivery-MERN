import { FormField } from "@components/common";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface DeliveryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

interface DeliveryFormProps {
  register: UseFormRegister<DeliveryFormData>;
  errors: FieldErrors<DeliveryFormData>;
}

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-tomato transition-colors placeholder:text-gray-300";

const DeliveryForm = ({ register, errors }: DeliveryFormProps) => {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100"
      data-delivery-form
    >
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">
          Delivery Information
        </h2>
      </div>
      <div className="px-6 py-5 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            placeholder="First name"
            {...register("firstName")}
            className={`${inputClass} ${errors.firstName ? "border-red-500" : ""}`}
            label="First Name"
            required
            error={errors.firstName?.message}
          />
          <FormField
            placeholder="Last name"
            {...register("lastName")}
            className={`${inputClass} ${errors.lastName ? "border-red-500" : ""}`}
            label="Last Name"
            required
            error={errors.lastName?.message}
          />
        </div>
        <FormField
          type="email"
          placeholder="Email address"
          {...register("email")}
          className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
          label="Email"
          required
          error={errors.email?.message}
        />
        <FormField
          type="tel"
          placeholder="Phone number"
          {...register("phone")}
          className={`${inputClass} ${errors.phone ? "border-red-500" : ""}`}
          label="Phone Number"
          required
          error={errors.phone?.message}
        />

        <FormField
          placeholder="Street address"
          {...register("address")}
          className={`${inputClass} ${errors.address ? "border-red-500" : ""}`}
          label="Street Address"
          required
          error={errors.address?.message}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            placeholder="City"
            {...register("city")}
            className={`${inputClass} ${errors.city ? "border-red-500" : ""}`}
            label="City"
            required
            error={errors.city?.message}
          />
          <FormField
            placeholder="ZIP / Postal code"
            {...register("zip")}
            className={`${inputClass} ${errors.zip ? "border-red-500" : ""}`}
            label="ZIP / Postal Code"
            required
            error={errors.zip?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
export type { DeliveryFormData };
