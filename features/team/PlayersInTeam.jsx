import InfoContainer from "../../ui/InfoContainer";
import Menus from "../../ui/Menus";
import Table from "./Table";
import { useTeamContext } from "./Team";
import TeamTableRow from "./TeamTabelRow";

function PlayersInTeam() {
  const { playersData } = useTeamContext();

  return (
    <Menus>
      <InfoContainer
        light="light"
        width="100%"
        height="100%"
        direction="column"
      >
        <Table columns="1fr 2.2fr 1.5fr 1.3fr 1.3fr 2fr">
          <Table.Header>
            <div>Номер</div>
            <div>Игрок</div>
            <div>Возраст</div>
            <div>Рост</div>
            <div>Вес</div>
            <div>Амплуа</div>
          </Table.Header>

          <Table.Body
            data={playersData}
            render={(player) => (
              <TeamTableRow key={player.id} player={player} />
            )}
          />
        </Table>
      </InfoContainer>
    </Menus>
  );
}

export default PlayersInTeam;
