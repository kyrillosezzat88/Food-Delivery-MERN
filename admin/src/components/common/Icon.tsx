import type { ComponentType, SVGProps } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CustomersIcon,
  DashboardIcon,
  DriversIcon,
  EditIcon,
  LogoIcon,
  MenuIcon,
  OrderCanceled,
  OrderDelivered,
  OrderIcon,
  OrderReturned,
  OrdersIcon,
  SettingsIcon,
  TrashIcon,
  UploadIcon,
} from "@icons";

const iconMap = {
  LogoIcon,
  DashboardIcon,
  MenuIcon,
  OrdersIcon,
  CustomersIcon,
  DriversIcon,
  SettingsIcon,
  OrderIcon,
  OrderDelivered,
  OrderCanceled,
  OrderReturned,
  TrashIcon,
  EditIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  UploadIcon,
} as const;

type IconName = keyof typeof iconMap;

type IconProps = {
  name: string;
  className?: string;
};

const Icon = ({ name, className }: IconProps) => {
  const IconComponent = iconMap[name as IconName] as
    | ComponentType<SVGProps<SVGSVGElement>>
    | undefined;

  if (!IconComponent) {
    // Unknown icon name: render nothing for now
    return null;
  }

  return <IconComponent className={className} width={24} height={24} />;
};

export default Icon;
