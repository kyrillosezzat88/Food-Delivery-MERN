import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Dashboard, Menu, Login, Orders, Customers } from "@pages";
import { MainLayout } from "@layouts";
import PrivateRoute from "@routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
