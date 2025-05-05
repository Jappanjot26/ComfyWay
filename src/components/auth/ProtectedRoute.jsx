import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ ownerOnly = false }) => {
  const { isAuthenticated, isInitialized, currentUser } = useAuth();

  // Wait for authentication to initialize
  if (!isInitialized) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to profile if owner-only route and user is not an owner
  if (ownerOnly && currentUser.role !== "owner") {
    return <Navigate to="/profile" replace />;
  }

  // Render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
