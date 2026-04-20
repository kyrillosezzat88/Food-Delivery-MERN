import { useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateLayout = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken && !token) {
      navigate("/auth", { replace: true });
    }
  }, [user, token, navigate]);

  if (!token && !localStorage.getItem("token")) return null;

  return <Outlet />;
};

export default PrivateLayout;
