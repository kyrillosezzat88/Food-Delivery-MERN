import {
  Cart,
  CompletedOrder,
  Home,
  Auth,
  Profile,
  VerifyEmail,
  NotFound,
} from "@pages";
import { AuthCallback } from "@components/auth";
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
      {
        path: "notFound",
        element: <NotFound />,
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
            path: "/orderCompleted/:orderId",
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
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "*",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <NotFound />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
