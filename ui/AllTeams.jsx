import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import Row from "./Row";

import TeamCard from "./TeamCard";
import LoadingTeamCard from "./LoadingTeamCard";
import InputFilterTeam from "./InputFilter";
import TableTitle from "../ui/TableTitle";

import { useTable } from "../features/table/useTable";
import ModalNewTeam from "../features/team/ModalNewTeam";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useAdmin } from "../hooks/useAdmin";

const OperationsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid #fff;

  background-color: var(--input-border-color);

  padding: 10px 20px;
  border-radius: var(--border-radius-lg-pfl);
`;

function AllTeams() {
  const { isLoading, tableData: teams } = useTable();

  const { isAdmin } = useAdmin();

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
  const loadedTeams = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  return (
    <ModalNewTeam>
      <Row gap={2}>
        <OperationsRow>
          <TableTitle as={"h3"} height="small">
            <span>Поиск команды:</span>
          </TableTitle>
          <InputFilterTeam value={value} handleChange={handleChange} />
        </OperationsRow>

        <Row type="horizontal" wrap="wrap">
          <>
            {isLoading
              ? loadedTeams.map((team) => <LoadingTeamCard key={team.id} />)
              : filteredTeams.map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))}

            {/* Компонент для добавления новой команды в лигу */}
            {isAdmin && <TeamCard team={{ adding: true }} />}
          </>
        </Row>
      </Row>
    </ModalNewTeam>
  );
}

export default AllTeams;
