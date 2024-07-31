import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Row from "./Row";

import TeamCard from "./TeamCard";
import LoadingTeamCard from "./LoadingTeamCard";
import InputFilterTeam from "./InputFilter";
import TableTitle from "../ui/TableTitle";

import { useTable } from "../features/table/useTable";

function AllTeams() {
  const { leagueId } = useParams(); // Получаем параметр
  const { isLoading, tableData: teams } = useTable();

  const [value, setValue] = useState("");

  // Обработчик изменения значения инпута
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Функция для фильтрации команд
  const filterTeams = (teams, value) => {
    return teams.filter((team) =>
      team.teamName.toLowerCase().includes(value.toLowerCase())
    );
  };

  // Отфильтрованный список команд
  const filteredTeams = filterTeams(teams, value);

  // Заглушки для загрузки
  const loadedTeams = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  return (
    <Row gap={2}>
      <Row type="horizontal">
        <TableTitle as={"h3"} height="small">
          Лига: ПФЛ-{leagueId}
        </TableTitle>
        <InputFilterTeam value={value} handleChange={handleChange} />
      </Row>
      <Row>
        <Outlet />
      </Row>

      <Row type="horizontal" wrap="wrap">
        {isLoading
          ? loadedTeams.map((team) => <LoadingTeamCard key={team.id} />)
          : filteredTeams.map((team) => <TeamCard key={team.id} team={team} />)}
      </Row>
    </Row>
  );
}

export default AllTeams;
