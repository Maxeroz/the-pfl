import { useSelector } from "react-redux";

export function useAdmin() {
  const role = useSelector((state) => state.user.role);
  const isAdmin = role === "admin";

  return { isAdmin };
}
