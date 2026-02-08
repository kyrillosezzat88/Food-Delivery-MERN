import { Navigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, token, loading } = useAppSelector((state) => state.user);

  // Show loading state while checking auth
  if (loading === "pending") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to login if user is not an admin
  if (!user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated and is an admin, render the component
  return <>{children}</>;
};

export default PrivateRoute;
