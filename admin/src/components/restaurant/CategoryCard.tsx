import { Confirm, Icon } from "@components/common";
import actDeleteCategory from "@store/category/actions/actDeleteCategory";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import type { TCategory } from "@types";
import { useState } from "react";

const CategoryCard = ({ _id, name, active, image }: TCategory) => {
  const { loading, error } = useAppSelector((state) => state.categories);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dispatch = useAppDispatch();

  const removeCategory = () => {
    dispatch(actDeleteCategory(_id)).finally(() => setConfirmDelete(false));
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
          confirmAction={removeCategory}
        />
      )}
      <div
        key={_id}
        className={`flex flex-col relative items-center justify-between w-24 h-24 rounded-2xl border bg-white text-xs font-medium shrink-0 shadow-sm ${
          active
            ? "border-primary bg-primary/5 text-primary"
            : "border-gray-100 text-gray-700 hover:bg-gray-50"
        }`}
      >
        <button
          type="button"
          className="absolute -top-2 -right-2 rounded-full w-6 h-6 cursor-pointer"
          onClick={() => setConfirmDelete(true)}
        >
          <Icon name="CloseIcon" />
        </button>
        <button
          type="button"
          className="absolute -top-2 -left-2 rounded-full w-6 h-6 cursor-pointer"
          onClick={() => {}}
        >
          <Icon name="EditCircleIcon" />
        </button>
        <div className="flex items-center justify-center w-12 h-12 mt-3 rounded-full bg-gray-900 overflow-hidden">
          {image ? (
            <img
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <span className="w-8 h-8 rounded-full bg-gray-700" />
          )}
        </div>
        <span className="mb-3 text-[11px] leading-tight text-center px-1">
          {name}
        </span>
      </div>
    </>
  );
};

export default CategoryCard;
