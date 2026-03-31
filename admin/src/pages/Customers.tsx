import { useState } from "react";
import Table from "@components/common/Table";
import Modal from "@components/common/Modal";
import Confirm from "@components/common/Confirm";
import Icon from "@components/common/Icon";
import type { TUser } from "@types";

// Mock data - replace with API call when backend is ready
const mockCustomers: TUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    isAdmin: false,
    address: "123 Main St, City, State 12345",
    phoneNumber: "+1 (555) 123-4567",
    createdAt: new Date("2024-01-15"),
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=880&q=80",
    orders: ["order1", "order2", "order3"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    isAdmin: false,
    address: "456 Oak Ave, City, State 12345",
    phoneNumber: "+1 (555) 987-6543",
    createdAt: new Date("2024-02-20"),
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=880&q=80",
    orders: ["order4", "order5"],
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    isAdmin: false,
    address: "789 Pine Rd, City, State 12345",
    phoneNumber: "+1 (555) 456-7890",
    createdAt: new Date("2024-03-10"),
    orders: ["order6"],
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState<TUser[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<TUser | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<TUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const columns = [
    {
      key: "profileImage",
      header: "Avatar",
      className: "w-16",
      headerClassName:
        "py-3.5 px-4 text-xs font-semibold text-left tracking-wide text-gray-500 uppercase",
    },
    {
      key: "name",
      header: "Name",
      headerClassName:
        "py-3.5 px-4 text-xs font-semibold text-left tracking-wide text-gray-500 uppercase",
    },
    {
      key: "email",
      header: "Email",
      headerClassName:
        "hidden md:table-cell py-3.5 px-4 text-xs font-semibold text-left tracking-wide text-gray-500 uppercase",
    },
    {
      key: "phoneNumber",
      header: "Phone",
      headerClassName:
        "hidden md:table-cell py-3.5 px-4 text-xs font-semibold text-left tracking-wide text-gray-500 uppercase",
    },
    {
      key: "address",
      header: "Address",
      headerClassName:
        "hidden lg:table-cell py-3.5 px-4 text-xs font-semibold text-left tracking-wide text-gray-500 uppercase",
    },
    {
      key: "orders",
      header: "Orders",
      headerClassName:
        "py-3.5 px-4 text-xs font-semibold text-left tracking-wide text-gray-500 uppercase",
    },
    {
      key: "createdAt",
      header: "Joined",
      headerClassName:
        "hidden md:table-cell py-3.5 px-4 text-xs font-semibold text-left tracking-wide text-gray-500 uppercase",
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-24",
      headerClassName:
        "py-3.5 px-4 text-xs font-semibold text-left tracking-wide text-gray-500 uppercase",
    },
  ];

  const handleEdit = (customer: TUser) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleDelete = (customer: TUser) => {
    setCustomerToDelete(customer);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!customerToDelete) return;

    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      setCustomers((prev) => prev.filter((c) => c.id !== customerToDelete.id));
      setIsDeleteConfirmOpen(false);
      setCustomerToDelete(null);
      setIsDeleting(false);
    }, 1000);
  };

  const handleSaveEdit = (updatedCustomer: TUser) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)),
    );
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
  };

  const renderRow = (customer: TUser, index: number) => (
    <tr key={customer.id} className="hover:bg-gray-50">
      <td className="py-4 px-4">
        <img
          src={
            customer.profileImage ||
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=880&q=80"
          }
          alt={customer.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </td>
      <td className="py-4 px-4 text-sm font-medium text-gray-900">
        <div className="flex flex-col">
          <span>{customer.name}</span>
          <span className="md:hidden text-xs text-gray-500 mt-1">
            {customer.email}
          </span>
          <span className="md:hidden text-xs text-gray-500">
            {customer.phoneNumber}
          </span>
        </div>
      </td>
      <td className="hidden md:table-cell py-4 px-4 text-sm text-gray-500">
        {customer.email}
      </td>
      <td className="hidden md:table-cell py-4 px-4 text-sm text-gray-500">
        {customer.phoneNumber}
      </td>
      <td className="hidden lg:table-cell py-4 px-4 text-sm text-gray-500 max-w-xs truncate">
        {customer.address}
      </td>
      <td className="py-4 px-4 text-sm text-gray-500">
        {customer.orders.length}
      </td>
      <td className="hidden md:table-cell py-4 px-4 text-sm text-gray-500">
        {customer.createdAt.toLocaleDateString()}
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEdit(customer)}
            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
            title="Edit customer"
          >
            <Icon name="EditIcon" className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(customer)}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
            title="Delete customer"
          >
            <Icon name="TrashIcon" className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="title">Customers</h1>
        <div className="text-sm text-gray-500">
          Total: {customers.length} customers
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <Table columns={columns} data={customers} renderRow={renderRow} />
      </div>

      {/* Edit Customer Modal */}
      <Modal
        title="Edit Customer"
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCustomer(null);
        }}
      >
        {selectedCustomer && (
          <EditCustomerForm
            customer={selectedCustomer}
            onSave={handleSaveEdit}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedCustomer(null);
            }}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Confirm
        title="Delete Customer"
        message={`Are you sure you want to delete ${customerToDelete?.name}? This action cannot be undone.`}
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setCustomerToDelete(null);
        }}
        loading={isDeleting ? "pending" : "idle"}
        confirmAction={confirmDelete}
      />
    </section>
  );
};

// Simple edit form component
const EditCustomerForm = ({
  customer,
  onSave,
  onCancel,
}: {
  customer: TUser;
  onSave: (customer: TUser) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<TUser>(customer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof TUser, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Customers;
