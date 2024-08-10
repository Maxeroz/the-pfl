import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewTeam as addNewTeamApi } from "../../services/apiTeam";
import { useModalNewTeamContext } from "./ModalNewTeam";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export function useAddTeam() {
  const queryClient = useQueryClient();
  const leagueTier = useSelector((state) => state.league.leagueTier);

  const { leagueId } = useParams();

  const navigate = useNavigate();

  const { handleClose } = useModalNewTeamContext();

  const {
    mutate: addNewTeam,
    isPending,
    error,
  } = useMutation({
    mutationFn: addNewTeamApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      handleClose?.();

      toast.success(
        `Команда ${data.teamName} успешно добавлена в турнир ${leagueTier}!`
      );
      navigate(`/teams/league/${leagueId}/team/${data.id}`);
    },
  });

  return { addNewTeam, isPending, error };
}
