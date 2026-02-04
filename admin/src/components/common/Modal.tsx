import type { ReactNode } from "react";

type TModal = {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ title, children, isOpen, onClose }: TModal) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center m-0"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative bg-white w-11/12 sm:w-1/3 p-8 rounded-2xl shadow-xl z-10">
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
