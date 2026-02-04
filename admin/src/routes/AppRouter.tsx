import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard, Menu } from "@pages";
import { MainLayout } from "@layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        path:'/',
        element: <Dashboard />,
      },
      {
        path:'/menu',
        element:<Menu />
      }
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

