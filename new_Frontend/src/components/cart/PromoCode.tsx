import { useState } from "react";

const PROMO_CODES: Record<string, number> = {
  SAVE10: 10,
  FOOD20: 20,
};

interface PromoCodeProps {
  onApply: (code: string, discount: number) => void;
  onRemove: () => void;
  appliedPromo: string | null;
}

const PromoCode = ({ onApply, onRemove, appliedPromo }: PromoCodeProps) => {
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");

  const handleApply = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      onApply(code, PROMO_CODES[code]);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code.");
    }
  };

  const handleRemove = () => {
    setPromoCode("");
    setPromoError("");
    onRemove();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">Promo Code</h2>
      </div>
      <div className="px-6 py-5">
        {appliedPromo ? (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <div>
              <p className="text-sm font-medium text-green-700">
                {appliedPromo}
              </p>
              <p className="text-xs text-green-500">
                {PROMO_CODES[appliedPromo]}% off applied
              </p>
            </div>
            <button
              onClick={handleRemove}
              className="text-green-400 hover:text-red-400 transition-colors text-lg"
            >
              &times;
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoError("");
                }}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-tomato transition-colors placeholder:text-gray-300"
              />
              <button
                onClick={handleApply}
                className="bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-tomato/90 transition-colors whitespace-nowrap"
              >
                Apply
              </button>
            </div>
            {promoError && <p className="text-xs text-red-400">{promoError}</p>}
            <p className="text-xs text-gray-400">
              Try: <span className="font-medium text-gray-500">SAVE10</span> or{" "}
              <span className="font-medium text-gray-500">FOOD20</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoCode;
