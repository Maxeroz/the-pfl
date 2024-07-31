import { Outlet, useParams } from "react-router-dom";
import Row from "./Row";

import { useTable } from "../features/table/useTable";
import TeamCard from "./TeamCard";

function AllTeams() {
  const { leagueId } = useParams(); // Получаем параметр
  const { isLoading, tableData: teams } = useTable();

  return (
    <Row gap={2}>
      <h2>Лига: ПФЛ-{leagueId}</h2>

      <Row>
        <Outlet />
      </Row>

      <Row type="horizontal" wrap="wrap">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} isLoading={isLoading}></TeamCard>
        ))}
      </Row>
    </Row>
  );
}

export default AllTeams;
