import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import CenterSpinnerDiv from "./CenterSpinnerDiv";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // If loading, show spinner
  if (isLoading) return <CenterSpinnerDiv />;

  // If authenticated, render the children
  if (isAuthenticated) return children;

  // Optionally, return null or a fallback UI when not authenticated to avoid potential issues
  return null;
}

export default ProtectedRoute;
