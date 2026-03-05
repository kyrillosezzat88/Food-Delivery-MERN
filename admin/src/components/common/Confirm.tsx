import FormAction from "@components/forms/FormActions";
import Modal from "./Modal";
import type { TLoading } from "@types";

type TConfirm = {
  title?: string;
  message: string;
  onClose: () => void;
  isOpen: boolean;
  loading: TLoading;
  confirmAction: () => void;
};
const Confirm = ({
  title,
  message,
  onClose,
  loading,
  isOpen,
  confirmAction,
}: TConfirm) => {
  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <p className=" text-gray-600 mb-6">{message}</p>
      <div className="flex justify-end">
        <FormAction
          onClose={onClose}
          submitting={loading === "pending" ? true : false}
          btnSubmitText="Confirm"
          LoadingText="saving..."
          onClick={confirmAction}
        />
      </div>
    </Modal>
  );
};

export default Confirm;
