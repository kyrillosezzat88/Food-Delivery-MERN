import { useState } from "react";

interface Address {
  id: number;
  label: string;
  address: string;
  city: string;
  zip: string;
  isDefault: boolean;
}

const inputClass =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-tomato transition-colors placeholder:text-gray-300";

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: "Home",
      address: "123 Main Street",
      city: "New York",
      zip: "10001",
      isDefault: true,
    },
    {
      id: 2,
      label: "Work",
      address: "456 Office Ave",
      city: "New York",
      zip: "10002",
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    label: "",
    address: "",
    city: "",
    zip: "",
  });

  const set =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses([...addresses, { id: Date.now(), ...form, isDefault: false }]);
    setForm({ label: "", address: "", city: "", zip: "" });
    setShowForm(false);
  };

  const handleDelete = (id: number) =>
    setAddresses(addresses.filter((a) => a.id !== id));

  const handleSetDefault = (id: number) =>
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));

  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-medium text-gray-800">
            Saved Addresses
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage your delivery addresses
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm bg-tomato text-white px-4 py-2 rounded-full hover:bg-tomato/90 transition-colors"
        >
          + Add new
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="px-6 py-5 border-b border-gray-100 flex flex-col gap-4 bg-gray-50"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Label (e.g. Home)</label>
              <input
                placeholder="Home"
                value={form.label}
                onChange={set("label")}
                className={inputClass}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">Street address</label>
              <input
                placeholder="123 Main St"
                value={form.address}
                onChange={set("address")}
                className={inputClass}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">City</label>
              <input
                placeholder="New York"
                value={form.city}
                onChange={set("city")}
                className={inputClass}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-500">ZIP code</label>
              <input
                placeholder="10001"
                value={form.zip}
                onChange={set("zip")}
                className={inputClass}
                required
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-tomato text-white px-5 py-2 rounded-full text-sm hover:bg-tomato/90 transition-colors"
            >
              Save address
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-sm text-gray-400 hover:text-gray-600 px-5 py-2 rounded-full border border-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Address List */}
      <div className="divide-y divide-gray-100">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="px-6 py-4 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-tomato/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-tomato"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-800">
                    {addr.label}
                  </p>
                  {addr.isDefault && (
                    <span className="text-xs bg-tomato/10 text-tomato px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{addr.address}</p>
                <p className="text-xs text-gray-400">
                  {addr.city}, {addr.zip}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!addr.isDefault && (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="text-xs text-gray-400 hover:text-tomato transition-colors"
                >
                  Set default
                </button>
              )}
              <button
                onClick={() => handleDelete(addr.id)}
                className="text-xs text-gray-300 hover:text-red-400 transition-colors"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedAddresses;
