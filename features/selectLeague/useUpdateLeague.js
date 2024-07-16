import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLeagueSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateLeague() {
  const queryClient = useQueryClient();

  const { mutate: updateLeague, isLoading: isUpdating } = useMutation({
    mutationFn: updateLeagueSetting,
    onSuccess: () => {
      // toast.success("League successfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateLeague, isUpdating };
}
