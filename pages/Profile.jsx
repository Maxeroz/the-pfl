import { useSelector } from "react-redux";
import { useProfile } from "../features/profile/useProfile";

import Row from "../ui/Row";
import TableTitle from "../ui/TableTitle";

import styled from "styled-components";
import ProfileInfoSpan from "../ui/ProfileInfoSpan";
import Loader from "../ui/Loader";

import {
  HiBuildingLibrary,
  HiCalendarDays,
  HiCheckCircle,
  HiInformationCircle,
} from "react-icons/hi2";
import { HiArrowsUpDown } from "react-icons/hi2";
import { useSettings } from "../features/selectLeague/useSettings";

const tableMapping = {
  "ПФЛ ЛИГА 1": 0,
  "ПФЛ ЛИГА 2": 1,
  "ПФЛ ЛИГА 3": 2,
};

const CenterSpinnerDiv = styled.div`
  display: flex;
  margin: auto 0;
  align-items: center;
  justify-content: center;
`;

const OpenWindowSpan = styled.span`
  color: var(--color-green-700);
`;

const ClosedWindowSpan = styled.span`
  color: var(--color-red-700);
`;

const ProfileInfoIcon = styled.span`
  display: flex;
  align-items: center;

  color: var(--color-grey-500);
`;

const BounderDiv = styled.div`
  border-bottom: 1px solid;
`;

function Profile() {
  const league = useSelector((state) => state.league.leagueTier);
  const { settings: { season } = {} } = useSettings();

  const { profile = [], isLoading } = useProfile();

  // Проверяем наличие профиля и правильного индекса
  const profileData = profile[tableMapping[league]];

  const { leagueName, transferWindow, email, number, city } = profileData
    ? profileData
    : "Нет данных";

  return (
    <Row gap={2}>
      <TableTitle>Общая информация</TableTitle>

      {isLoading ? (
        <CenterSpinnerDiv>
          <Loader isLoading={isLoading} size={50} display={false} />
        </CenterSpinnerDiv>
      ) : (
        <Row gap={1}>
          <BounderDiv>
            <ProfileInfoSpan>
              <ProfileInfoIcon>
                <HiCheckCircle />
              </ProfileInfoIcon>
              Приглашаем команды в турнир
            </ProfileInfoSpan>

            <ProfileInfoSpan>
              <ProfileInfoIcon>
                <HiArrowsUpDown />
              </ProfileInfoIcon>
              Трансферное окно
              {transferWindow ? (
                <OpenWindowSpan> открыто</OpenWindowSpan>
              ) : (
                <ClosedWindowSpan> закрыто</ClosedWindowSpan>
              )}
            </ProfileInfoSpan>
          </BounderDiv>

          <BounderDiv>
            <ProfileInfoSpan>
              <ProfileInfoIcon>
                <HiInformationCircle />
              </ProfileInfoIcon>
              {leagueName}
            </ProfileInfoSpan>
          </BounderDiv>

          <ProfileInfoSpan>
            <ProfileInfoIcon>
              <HiCalendarDays />
            </ProfileInfoIcon>
            {season}
          </ProfileInfoSpan>

          <ProfileInfoSpan>
            <ProfileInfoIcon>
              <HiBuildingLibrary />
            </ProfileInfoIcon>
            {city}
          </ProfileInfoSpan>

          <TableTitle>Команды, участвующие в турнире - X</TableTitle>
        </Row>
      )}
    </Row>
  );
}

export default Profile;
