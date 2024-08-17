import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (newUser) => {
      toast.success(`${newUser.user_metadata.fullName}, добро пожаловать!`);
      navigate("/profile");
    },
  });

  return { signup, isPending };
}
