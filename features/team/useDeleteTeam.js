import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTeamById } from "../../services/apiTeam";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const leagueTier = useSelector((state) => state.league.leagueTier);

  const { leagueId } = useParams();

  const {
    mutate: deleteTeam,
    isPending,
    error,
  } = useMutation({
    mutationFn: deleteTeamById,
    onSuccess: () => {
      navigate(`/teams/league/${leagueId}`);

      toast.success("Команда успешно удалена");
      queryClient.invalidateQueries(["table"], leagueTier);
    },
  });

  return { deleteTeam, isPending };
}
