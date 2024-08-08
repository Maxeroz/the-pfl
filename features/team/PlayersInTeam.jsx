import { useEffect, useRef } from "react";
import InfoContainer from "../../ui/InfoContainer";
import Menus from "../../ui/Menus";
import Table from "./Table";
import { useTeamContext } from "./Team";
import TeamTableRow from "./TeamTabelRow";

function PlayersInTeam() {
  const { playersData, isPlayersOpen } = useTeamContext();
  const infoContainerRef = useRef(null); // Создаем реф для InfoContainer

  // Ограничиваем количество игроков до 10
  const limitedPlayersData = playersData.slice(0, 10);

  useEffect(() => {
    if (infoContainerRef.current) {
      infoContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [isPlayersOpen]);

  if (isPlayersOpen)
    return (
      <Menus>
        <InfoContainer
          ref={infoContainerRef} // Присваиваем реф
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
              data={limitedPlayersData} // Передаем ограниченные данные
              render={(player) => (
                <TeamTableRow key={player.id} player={player} />
              )}
            />
          </Table>
        </InfoContainer>
      </Menus>
    );

  return null; // Возвращаем null, если isPlayersOpen ложное
}

export default PlayersInTeam;
