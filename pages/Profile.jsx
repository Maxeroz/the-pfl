import { useSelector } from "react-redux";
import { useProfile } from "../features/profile/useProfile";

import Row from "../ui/Row";
import TableTitle from "../ui/TableTitle";

// import styled from "styled-components";
// import ProfileInfoSpan from "../ui/ProfileInfoSpan";
// import Loader from "../ui/Loader";

// import {
//   HiBuildingLibrary,
//   HiCalendarDays,
//   HiCheckCircle,
//   HiInformationCircle,
// } from "react-icons/hi2";
// import { HiArrowsUpDown } from "react-icons/hi2";
import { useSettings } from "../features/selectLeague/useSettings";
import { useTable } from "../features/table/useTable";
import InfoBlock from "../ui/InfoBlock";
// import ReusableResultsTable from "../ui/ReusableResultsTable";
import ImageTeams from "../ui/ImageTeams";

const tableMapping = {
  "ПФЛ ЛИГА 1": 0,
  "ПФЛ ЛИГА 2": 1,
  "ПФЛ ЛИГА 3": 2,
};

// const CenterSpinnerDiv = styled.div`
//   display: flex;
//   margin: auto 0;
//   align-items: center;
//   justify-content: center;
// `;

// const OpenWindowSpan = styled.span`
//   color: var(--color-green-700);
// `;

// const ClosedWindowSpan = styled.span`
//   color: var(--color-red-700);
// `;

// const ProfileInfoIcon = styled.span`
//   display: flex;
//   align-items: center;

//   color: var(--color-grey-500);
// `;

// const BounderDiv = styled.div`
//   border-bottom: 1px solid;
// `;

function Profile() {
  const league = useSelector((state) => state.league.leagueTier);
  const leagueId = league.split(" ").slice(-1)[0]; // Исправление: получаем строку
  const { tableData = [] } = useTable();

  const teamAmount = tableData.length;
  // const teamsToPlay = tableData.map((team) => team.teamName);

  const { settings: { season } = {} } = useSettings();
  const { profile = [], isLoading } = useProfile();

  // Проверяем наличие профиля и правильного индекса
  const profileData = profile[tableMapping[league]];

  const { transferWindow } = profileData ? profileData : "Нет данных";

  return (
    <Row gap={3}>
      <Row>
        <TableTitle>Общая информация</TableTitle>
      </Row>
      <Row type="horizontal" gap={2}>
        {/* Отображение информации о сезоне */}
        <InfoBlock
          text="Текущий сезон:"
          dataString={season}
          width="450px"
          isLoading={isLoading}
          light="light"
          height="64px"
        />

        {/* Отображение информации о трансферном окне */}
        <InfoBlock
          text="Трансферное окно"
          dataString={transferWindow}
          width="200px"
          isLoading={isLoading}
          height="64px"
        />
      </Row>

      <Row type="horizontal" gap={2}>
        <InfoBlock
          text={`Команды, участвующие в турнире - ${teamAmount}`}
          width="250px"
          isLoading={isLoading}
          height="64px"
          action={true}
          to={`/teams/league/${leagueId}`}
        />

        <InfoBlock
          isLoading={isLoading}
          width="470px"
          light="light"
          height="70px"
        >
          <ImageTeams teams={tableData} />
        </InfoBlock>
      </Row>
      <Row />
    </Row>
  );

  // return (
  //   <Row gap={2}>
  //     <TableTitle>Общая информация</TableTitle>

  //     {isLoading ? (
  //       <CenterSpinnerDiv>
  //         <Loader isLoading={isLoading} size={50} display={false} />
  //       </CenterSpinnerDiv>
  //     ) : (
  //       <Row gap={1}>
  //         <BounderDiv>
  //           <ProfileInfoSpan>
  //             <ProfileInfoIcon>
  //               <HiCheckCircle />
  //             </ProfileInfoIcon>
  //             Приглашаем команды в турнир
  //           </ProfileInfoSpan>

  //           <ProfileInfoSpan>
  //             <ProfileInfoIcon>
  //               <HiArrowsUpDown />
  //             </ProfileInfoIcon>
  //             Трансферное окно
  //             {transferWindow ? (
  //               <OpenWindowSpan> открыто</OpenWindowSpan>
  //             ) : (
  //               <ClosedWindowSpan> закрыто</ClosedWindowSpan>
  //             )}
  //           </ProfileInfoSpan>
  //         </BounderDiv>

  //         <BounderDiv>
  //           <ProfileInfoSpan>
  //             <ProfileInfoIcon>
  //               <HiInformationCircle />
  //             </ProfileInfoIcon>
  //             {leagueName}
  //           </ProfileInfoSpan>
  //         </BounderDiv>

  //         <ProfileInfoSpan>
  //           <ProfileInfoIcon>
  //             <HiCalendarDays />
  //           </ProfileInfoIcon>
  //           {season}
  //         </ProfileInfoSpan>

  //         <ProfileInfoSpan>
  //           <ProfileInfoIcon>
  //             <HiBuildingLibrary />
  //           </ProfileInfoIcon>
  //           {city}
  //         </ProfileInfoSpan>

  //         <TableTitle>Команды, участвующие в турнире - {teamAmount}</TableTitle>

  //         <ProfileInfoSpan>
  //           {teamsToPlay.map((teamName) => (
  //             <span key={teamName}>{teamName} / </span>
  //           ))}
  //         </ProfileInfoSpan>
  //       </Row>
  //     )}
  //   </Row>
  // );
}

export default Profile;
