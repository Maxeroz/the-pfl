import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    error,
    isPending,
  } = useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      navigate("/login");
      toast.success("Вы успешно вышли!");
      queryClient.removeQueries();
    },
  });

  return { logout, error, isPending };
}
