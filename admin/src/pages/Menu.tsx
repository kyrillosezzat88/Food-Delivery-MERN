import { Modal } from "@components/common";
import { AddCategory, AddProduct } from "@components/forms";
import { CategoryCard, FoodCard } from "@components/restaurant";
import { useState } from "react";

const initialCategories = [
  { id: 2, name: "Leg Piece" },
  { id: 3, name: "Boneless" },
  { id: 4, name: "Normal cut" },
  { id: 5, name: "Curry cut", active: true },
  { id: 6, name: "Wings" },
  { id: 7, name: "Lollipop" },
];

const items = [
  {
    id: 1,
    name: "Chicken curry cut - small pieces",
    price: 140,
    count: 1,
    image:
      "https://images.unsplash.com/photo-1604908176997-1251884b08a3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Chicken curry cut - small pieces (Large Pack)",
    price: 599,
    count: 1,
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Chicken curry cut - Large pieces",
    price: 140,
    count: 1,
    image:
      "https://images.unsplash.com/photo-1588167865096-71c620227d92?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Chicken curry cut - Large pieces (Large Pack)",
    price: 599,
    count: 1,
    image:
      "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=800&q=80",
  },
];

const Menu = () => {
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openAddItemModal, setOpenAddItemModal] = useState(false);

  // open category
  const addCategoryModal = (status: boolean) => {
    setOpenAddCategoryModal(status);
  };

  // open item
  const addItemModal = (status: boolean) => {
    setOpenAddItemModal(status);
  };

  return (
    <section className="p-10 space-y-8">
      <Modal
        title="Add Category"
        isOpen={openAddCategoryModal}
        onClose={() => addCategoryModal(false)}
      >
        <AddCategory onClose={() => addCategoryModal(false)} />
      </Modal>
      <Modal
        title="Add Item"
        isOpen={openAddItemModal}
        onClose={() => addItemModal(false)}
      >
        <AddProduct onClose={() => addItemModal(false)} />
      </Modal>

      {/* Categories row */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        <button
          onClick={() => addCategoryModal(true)}
          className="flex flex-col items-center justify-center w-28 h-28 rounded-2xl border border-dashed border-primary/50 bg-primary/5 text-xs font-medium text-gray-700 shrink-0"
        >
          <span className="flex items-center justify-center w-9 h-9 mb-2 rounded-full bg-primary text-white text-lg">
            +
          </span>
          <span className="text-[11px] leading-tight text-center">
            Add New Category
          </span>
        </button>
        {initialCategories.map((cat) => (
          <CategoryCard key={cat.id} {...cat} />
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Add new item card */}
        <article
          onClick={() => addItemModal(true)}
          className="flex flex-col items-center justify-center h-60 rounded-3xl bg-primary/5 border border-primary/10 text-primary shadow-sm"
        >
          <button className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-primary text-white text-2xl">
            +
          </button>
          <p className="text-sm font-medium text-gray-700">Add New Item</p>
        </article>

        {items.map((item) => (
          <FoodCard {...item} />
        ))}
      </div>
    </section>
  );
};

export default Menu;
