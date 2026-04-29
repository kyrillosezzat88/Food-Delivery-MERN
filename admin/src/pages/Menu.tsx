import { Modal } from "@components/common";
import { AddCategory, AddProduct } from "@components/forms";
import { CategoryCard, FoodCard } from "@components/restaurant";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetCategories } from "@store/category/categorySlice";
import { actGetProducts } from "@store/item/ProductSlice";
import type { TCategory, TProduct } from "@types";
import { CategorySkeleton, ProductSkeleton } from "@components/skeletons";

const Menu = () => {
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null,
  );
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const dispatch = useAppDispatch();
  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useAppSelector((state) => state.categories);
  const {
    products,
    loading: productLoading,
    error: productError,
  } = useAppSelector((state) => state.products);
  // open category
  const addCategoryModal = (status: boolean) => {
    setOpenAddCategoryModal(status);
  };

  // open item
  const addItemModal = (status: boolean) => {
    setOpenAddItemModal(status);
  };

  const editCategory = (category: TCategory) => {
    setSelectedCategory(category);
    setOpenAddCategoryModal(true);
  };
  const editProduct = (product: TProduct) => {
    setSelectedProduct(product);
    setOpenAddItemModal(true);
  };
  const onCloseCategoryModal = () => {
    setOpenAddCategoryModal(false);
    setSelectedCategory(null);
  };
  const onCloseProductModal = () => {
    setOpenAddItemModal(false);
    setSelectedProduct(null);
  };
  useEffect(() => {
    if (categories.data.length === 0) {
      dispatch(actGetCategories());
    }
    if (products.length === 0) {
      dispatch(actGetProducts());
    }
  }, []);

  return (
    <section className="md:p-10 space-y-8">
      <Modal
        title="Add Category"
        isOpen={openAddCategoryModal}
        onClose={onCloseCategoryModal}
      >
        <AddCategory
          category={selectedCategory}
          onClose={onCloseCategoryModal}
        />
      </Modal>
      <Modal
        title="Add Item"
        isOpen={openAddItemModal}
        onClose={onCloseProductModal}
      >
        <AddProduct product={selectedProduct} onClose={onCloseProductModal} />
      </Modal>

      {categoryLoading === "pending" ? (
        <div className="grid grid-cols-6">
          {Array(6)
            .fill(null)
            .map((_, indx) => (
              <CategorySkeleton key={indx} />
            ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto py-2 ">
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
          {categories.data.map((cat) => (
            <CategoryCard key={cat._id} {...cat} editCategory={editCategory} />
          ))}
        </div>
      )}

      {productLoading === "pending" ? (
        <div className="grid grid-cols-4">
          {Array(4)
            .fill(null)
            .map((_, indx) => (
              <ProductSkeleton key={indx} />
            ))}
        </div>
      ) : (
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

          {products.map((product, index) => (
            <FoodCard key={index} {...product} editProduct={editProduct} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Menu;
