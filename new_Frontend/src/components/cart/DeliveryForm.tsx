import { FormField } from "@components/common";

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
  const set =
    (field: keyof DeliveryFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...form, [field]: e.target.value });

  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">
          Delivery Information
        </h2>
      </div>
      <div className="px-6 py-5 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="First name"
            value={form.firstName}
            onChange={set("firstName")}
            className={inputClass}
          />
          <input
            placeholder="Last name"
            value={form.lastName}
            onChange={set("lastName")}
            className={inputClass}
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={set("email")}
          className={inputClass}
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={set("phone")}
          className={inputClass}
        />
        <input
          placeholder="Street address"
          value={form.address}
          onChange={set("address")}
          className={inputClass}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="City"
            value={form.city}
            onChange={set("city")}
            className={inputClass}
          />
          <input
            placeholder="ZIP / Postal code"
            value={form.zip}
            onChange={set("zip")}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
export type { DeliveryFormData };
