type TFormAction = {
  onClose: () => void;
  submitting: boolean;
  btnSubmitText: string;
  LoadingText: string;
};
const FromActions = ({
  onClose,
  submitting,
  btnSubmitText,
  LoadingText,
}: TFormAction) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onClose}
        disabled={submitting}
        className="cursor-pointer px-4 py-2 rounded-lg border border-gray-200 hover:shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={submitting}
        aria-disabled={submitting}
        className={`cursor-pointer px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
          submitting ? "" : ""
        }`}
      >
        {submitting ? (
          <>
            <span className="animate-spin">⏳</span>
            {LoadingText}
          </>
        ) : (
          btnSubmitText
        )}
      </button>
    </div>
  );
};

export default FromActions;
