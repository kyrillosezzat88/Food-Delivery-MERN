import type { TOrder } from "@types";

type TDeliveryInfoProps = {
  recentOrder: TOrder;
};
const DeliveryInfo = ({ recentOrder }: TDeliveryInfoProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800">Delivering To</h2>
      </div>
      <div className="px-6 py-4 flex flex-col gap-1 text-sm text-gray-600">
        <p className="font-medium text-gray-800">
          {`${recentOrder?.user?.firstName} ${recentOrder?.user?.lastName}`}
        </p>
        <p>{recentOrder?.deliveryAddress || ""}</p>
        <p>{recentOrder?.phoneNumber || ""}</p>
      </div>
    </div>
  );
};

export default DeliveryInfo;
