import { useDispatch, useSelector } from "react-redux";

import TableTitle from "../../ui/TableTitle";
import HeaderUserBox from "../../ui/HeaderUserBox";

import { useSettings } from "../../features/selectLeague/useSettings";
import { useTable } from "../../features/table/useTable";
import InfoBlock from "../../ui/InfoBlock";

import { useUpdateTransferWindow } from "../../features/selectLeague/useUpdateTransferWindow";

import User from "../../ui/User";
import { useProfile } from "./useProfile";
import Row from "../../ui/Row";

function ProfileLayout() {
  const league = useSelector((state) => state.league.leagueTier);

  const leagueId = league.split(" ").slice(-1)[0];
  const { tableData = [] } = useTable();

  const teamAmount = tableData.length;
  // const teamsToPlay = tableData.map((team) => team.teamName);

  const { settings: { season } = {} } = useSettings();
  const { profile = [], isLoading } = useProfile();

  // Проверяем наличие профиля и правильного индекса
  const profileData = profile.find(
    (profile) => profile.id === Number(leagueId)
  );

  const { transferWindow } = profileData ? profileData : "Нет данных";

  const { updateTransferWindow } = useUpdateTransferWindow(!transferWindow);
  return (
    <Row gap={3}>
      {/* Заголовок */}

      <HeaderUserBox>
        <TableTitle>Общая информация</TableTitle>
        <User />
      </HeaderUserBox>

      <Row type="horizontal" gap={2}>
        {/* Отображение информации о сезоне */}
        <InfoBlock
          text="Текущий сезон:"
          dataString={season}
          width="65%"
          isLoading={isLoading}
          light="light"
          height="64px"
        />

        {/* Отображение информации о трансферном окне */}
        <InfoBlock
          text="Трансферное окно"
          dataString={transferWindow}
          width="35%"
          isLoading={isLoading}
          height="64px"
          onClick={updateTransferWindow}
        />
      </Row>

      <Row type="horizontal" gap={2}>
        {/* Отображение информации о участвующих командах */}
        <InfoBlock
          text={`Команды, участвующие в турнире - ${teamAmount}`}
          width="250px"
          isLoading={isLoading}
          height="64px"
          action={true}
          to={`/teams/league/${leagueId}`}
        />

        {/* <InfoBlock
            isLoading={isLoading}
            width="65%"
            light="light"
            height="70px"
            scrollX="scroll"
          >
            <ImageTeams teams={tableData} />
          </InfoBlock> */}
      </Row>
      <Row />
    </Row>
  );
}

export default ProfileLayout;
