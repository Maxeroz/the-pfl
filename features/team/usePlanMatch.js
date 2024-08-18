import { useMutation } from "@tanstack/react-query";
import { planMatch as planMatchApi } from "../../services/apiMatch";
import toast from "react-hot-toast";

export function usePlanMatch() {
  const { mutate: planMatch, isPending } = useMutation({
    mutationFn: (newMatchObj) => planMatchApi(newMatchObj),
    onSuccess: () => {
      toast.success("Матч успешно запланирован!");
    },
  });

  return { planMatch, isPending };
}
