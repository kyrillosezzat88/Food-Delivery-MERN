import { useState } from "react";
import { FormField } from "@components/common";
import { deliveryFormSchema, type DeliveryFormErrors } from "@validations";
import { validateField } from "@utils/validateField";

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
  form: DeliveryFormData;
  onChange: (updated: DeliveryFormData) => void;
}

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-tomato transition-colors placeholder:text-gray-300";

const DeliveryForm = ({ form, onChange }: DeliveryFormProps) => {
  const [errors, setErrors] = useState<DeliveryFormErrors>({});

  const set =
    (field: keyof DeliveryFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updated = { ...form, [field]: e.target.value };
      onChange(updated);
      // Clear error for this field
      if (errors[field]) {
        setErrors((prev: DeliveryFormErrors) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const handleValidateField = (field: keyof DeliveryFormData) => {
    const errorMessage = validateField(deliveryFormSchema, field, form[field]);

    setErrors((prev) => ({
      ...prev,
      [field]: errorMessage,
    }));
  };
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
            value={form.firstName}
            onChange={set("firstName")}
            onBlur={() => handleValidateField("firstName")}
            className={`${inputClass} ${errors.firstName ? "border-red-500" : ""}`}
            label="First Name"
            required
            error={errors.firstName}
          />
          <FormField
            placeholder="Last name"
            value={form.lastName}
            onChange={set("lastName")}
            onBlur={() => handleValidateField("lastName")}
            className={`${inputClass} ${errors.lastName ? "border-red-500" : ""}`}
            label="Last Name"
            required
            error={errors.lastName}
          />
        </div>
        <FormField
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={set("email")}
          onBlur={() => handleValidateField("email")}
          className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
          label="Email"
          required
          error={errors.email}
        />
        <FormField
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={set("phone")}
          onBlur={() => handleValidateField("phone")}
          className={`${inputClass} ${errors.phone ? "border-red-500" : ""}`}
          label="Phone Number"
          required
          error={errors.phone}
        />

        <FormField
          placeholder="Street address"
          value={form.address}
          onChange={set("address")}
          onBlur={() => handleValidateField("address")}
          className={`${inputClass} ${errors.address ? "border-red-500" : ""}`}
          label="Street Address"
          required
          error={errors.address}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            placeholder="City"
            value={form.city}
            onChange={set("city")}
            onBlur={() => handleValidateField("city")}
            className={`${inputClass} ${errors.city ? "border-red-500" : ""}`}
            label="City"
            required
            error={errors.city}
          />
          <FormField
            placeholder="ZIP / Postal code"
            value={form.zip}
            onChange={set("zip")}
            onBlur={() => handleValidateField("zip")}
            className={`${inputClass} ${errors.zip ? "border-red-500" : ""}`}
            label="ZIP / Postal Code"
            required
            error={errors.zip}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
export type { DeliveryFormData };
