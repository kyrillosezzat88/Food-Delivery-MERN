import { Icon } from "@components/common"
import type { TOrderCard } from "@types"

const OrderCard = ({icon , title , subTitle}:TOrderCard) => {
  return (
    <div className="flex items-center gap-4 shadow border border-gray-50 p-4 rounded-2xl hover:shadow-2xl transition-all cursor-pointer">
        <Icon name={icon} className="w-20 h-20"/>
        <div className="flex flex-col gap-1">
            <h3 className="font-bold text-3xl">{title}</h3>
            <p className="text-sm font-medium">{subTitle}</p>
        </div>
    </div>
  )
}

export default OrderCard