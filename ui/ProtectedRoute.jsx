import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import CenterSpinnerDiv from "./CenterSpinnerDiv";
import { useDispatch } from "react-redux";
import { useRole } from "../features/authentication/useRole";
import { setUser } from "../features/authentication/userSlice";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  const dispatch = useDispatch();
  const { role } = useRole();

  // Установка роли пользователя, когда пользователь вошел на сайт
  useEffect(() => {
    if (role !== null) dispatch(setUser(role));
  }, [role]);

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
