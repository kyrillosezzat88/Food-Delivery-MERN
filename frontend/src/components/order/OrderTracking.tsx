type TOrderTrackingProps = {
  orderStatus: string;
};

type StatusKey =
  | "pending"
  | "Confirmed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type Step = {
  label: string;
  description: string;
  key: Exclude<StatusKey, "Cancelled">;
};

const STEPS: Step[] = [
  {
    label: "Order Placed",
    description: "We received your order",
    key: "pending",
  },
  { label: "Preparing", description: "Kitchen is on it", key: "Confirmed" },
  {
    label: "On the way",
    description: "Driver is heading to you",
    key: "Shipped",
  },
  { label: "Delivered", description: "Enjoy your meal!", key: "Delivered" },
];

const getStatusKey = (status: string): StatusKey => {
  const normalized = status?.toLowerCase() ?? "pending";

  if (normalized.includes("delivered")) return "Delivered";
  if (normalized.includes("shipped") || normalized.includes("on the way"))
    return "Shipped";
  if (normalized.includes("confirmed")) return "Confirmed";
  if (normalized.includes("cancelled")) return "Cancelled";
  return "pending";
};

type StepMarkerProps = {
  done: boolean;
  isActive: boolean;
};

const StepMarker = ({ done, isActive }: StepMarkerProps) => {
  const markerColor = done
    ? "bg-primary border-primary"
    : isActive
      ? "bg-white border-primary"
      : "bg-white border-gray-200";

  return (
    <div
      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${markerColor}`}
    >
      {done ? (
        <svg
          className="w-4 h-4 text-white z-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <div
          className={`w-3 h-3 rounded-full ${isActive ? "bg-primary" : "bg-gray-200"}`}
        />
      )}
    </div>
  );
};

const OrderTracking = ({ orderStatus }: TOrderTrackingProps) => {
  const currentStatus = getStatusKey(orderStatus);
  const isCancelled = currentStatus === "Cancelled";

  const currentStepIndex = STEPS.findIndex(
    (step) => step.key === currentStatus,
  );
  const activeStep = currentStepIndex >= 0 ? currentStepIndex : 0;
  const progressWidth = `${(activeStep / (STEPS.length - 2)) * 100}%`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Delivery progress
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-gray-900">
            {isCancelled ? "Order cancelled" : `Status: ${orderStatus}`}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {isCancelled
              ? "This order has been cancelled. Contact support if you need help."
              : "We’ll keep this timeline updated as your order moves toward delivery."}
          </p>
        </div>
        <div
          className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
            isCancelled
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-emerald-700"
          }`}
        >
          {isCancelled ? "Cancelled" : orderStatus}
        </div>
      </div>

      <div className="mt-8 relative">
        <div className="absolute left-6 right-6 top-5 h-1 rounded-full bg-gray-100" />
        <div
          className="absolute left-6 top-5 h-1 rounded-full bg-primary transition-all duration-500"
          style={{ width: isCancelled ? "0%" : progressWidth }}
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
          {STEPS.map((step, index) => {
            const done = isCancelled ? index === 0 : index <= activeStep;
            const isActive = !isCancelled && index === activeStep;
            const textColor =
              done || isActive ? "text-gray-900" : "text-gray-400";

            return (
              <div
                key={step.key}
                className="flex flex-col items-center gap-3 text-center"
              >
                <StepMarker done={done} isActive={isActive} />
                <div>
                  <p className={`text-sm font-medium ${textColor}`}>
                    {step.label}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-400 hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
