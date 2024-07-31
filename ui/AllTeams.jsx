import { Outlet, useParams } from "react-router-dom";
import Row from "./Row";

import { useTable } from "../features/table/useTable";
import TeamCard from "./TeamCard";
import LoadingTeamCard from "./LoadingTeamCard";

function AllTeams() {
  const { leagueId } = useParams(); // Получаем параметр
  const { isLoading, tableData: teams } = useTable();

  let loadedTeams = [{ id: 1 }, { id: 2 }];

  return (
    <Row gap={2}>
      <h2>Лига: ПФЛ-{leagueId}</h2>

      <Row>
        <Outlet />
      </Row>

      <Row type="horizontal" wrap="wrap">
        {isLoading
          ? loadedTeams.map((team) => <LoadingTeamCard key={team.id} />)
          : teams.map((team) => (
              <TeamCard key={team.id} team={team}></TeamCard>
            ))}
      </Row>
    </Row>
  );
}

export default AllTeams;
