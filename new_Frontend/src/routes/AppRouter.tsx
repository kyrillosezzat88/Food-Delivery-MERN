import { Cart, CompletedOrder, Home, Auth, Profile, VerifyEmail } from "@pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrivateLayout from "../layouts/PrivateLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // ── Protected routes ──
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/completed",
            element: <CompletedOrder />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
