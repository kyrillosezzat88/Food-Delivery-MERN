import { Confirm } from "@components/common";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actDeleteProduct } from "@store/item/ProductSlice";
import type { TProduct } from "@types";
import { useState } from "react";

type TProductProps = TProduct & {
  editProduct: (product: TProduct) => void;
};

const FoodCard = ({
  _id,
  name,
  mainImage,
  count,
  price,
  description,
  gallery,
  active,
  category,
  editProduct,
}: TProductProps) => {
  const product = {
    _id,
    name,
    mainImage,
    count,
    price,
    description,
    gallery,
    active,
    category,
  };
  const { loading, error } = useAppSelector((state) => state.products);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const dispatch = useAppDispatch();
  const deleteProduct = () => {
    dispatch(actDeleteProduct(_id)).finally(() => setConfirmDelete(false));
  };

  return (
    <>
      {confirmDelete && (
        <Confirm
          title={`Delete ${name}`}
          onClose={() => setConfirmDelete(false)}
          loading={loading}
          isOpen={confirmDelete}
          message={`want delete ${name} are you sure ?`}
          confirmAction={deleteProduct}
        />
      )}
      <article
        key={_id}
        className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition"
      >
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={mainImage}
            alt={name}
            className="object-cover w-full h-full"
          />
          <button
            onClick={() => editProduct(product)}
            className="absolute top-3 right-3 cursor-pointer px-3 py-1 text-[11px] font-medium rounded-full bg-white text-gray-800 shadow-sm"
          >
            Edit
          </button>
        </div>

        <div className="flex flex-col justify-between flex-1 p-4">
          <div>
            <h3 className="mb-1 text-sm font-semibold text-gray-900 line-clamp-2">
              {name}
            </h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-500">
              <span>Count: {count}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-base font-semibold text-gray-900">
              ${price}
            </span>
            <button
              onClick={() => setConfirmDelete(true)}
              className="cursor-pointer px-5 py-1.5 text-xs font-semibold text-white rounded-full bg-primary hover:opacity-90 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default FoodCard;
