const OrderTracking = () => {
  const steps = [
    {
      label: "Order Placed",
      description: "We received your order",
      done: true,
    },
    { label: "Preparing", description: "Kitchen is on it", done: true },
    {
      label: "On the way",
      description: "Driver is heading to you",
      done: false,
    },
    { label: "Delivered", description: "Enjoy your meal!", done: false },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">Order Status</h2>
      </div>
      <div className="px-6 py-6">
        <div className="flex items-start justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 mx-8 z-0" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-tomato z-0 transition-all duration-500"
            style={{ width: "40%", marginLeft: "2rem" }}
          />

          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 z-10 flex-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                  step.done
                    ? "bg-tomato border-tomato"
                    : index === steps.findIndex((s) => !s.done)
                      ? "bg-white border-tomato"
                      : "bg-white border-gray-200"
                }`}
              >
                {step.done ? (
                  <svg
                    className="w-4 h-4 text-white"
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
                    className={`w-2 h-2 rounded-full ${index === steps.findIndex((s) => !s.done) ? "bg-tomato" : "bg-gray-200"}`}
                  />
                )}
              </div>
              <div className="text-center">
                <p
                  className={`text-xs font-medium ${step.done ? "text-gray-800" : "text-gray-400"}`}
                >
                  {step.label}
                </p>
                <p className="text-[11px] text-gray-400 hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
