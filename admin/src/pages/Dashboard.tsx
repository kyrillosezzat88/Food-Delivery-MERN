import { RecentOrders, OrderCard } from "@components/restaurant";

const Dashboard = () => {
  return (
    <section>
      <h1 className="title">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <OrderCard icon="OrderIcon" title="75" subTitle="Total Orders" />
        <OrderCard
          icon="OrderDelivered"
          title="150"
          subTitle="Total Delivered"
        />
        <OrderCard icon="OrderCanceled" title="10" subTitle="Total Canceled" />
        <OrderCard icon="OrderReturned" title="5" subTitle="Total Returned" />
      </div>
      <RecentOrders />
    </section>
  );
};

export default Dashboard;
