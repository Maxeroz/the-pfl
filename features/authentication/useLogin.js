import { useMutation } from "@tanstack/react-query";
import { loginWithEmail } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginWithEmail({ email, password }),
    onSuccess: () => {
      toast.success("Вход выполнен!");
      navigate("/profile");
    },
    onError: (error) => {
      toast.error("Неверные email или пароль");
    },
  });

  return { login, isPending };
}
