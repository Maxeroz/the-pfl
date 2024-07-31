import styled from "styled-components";
import InfoContainer from "./InfoContainer";
import Row from "./Row";
import { Avatar, linkClasses } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import DetailItem from "./DetailItem";

import { GiSoccerBall } from "react-icons/gi";
import { TbPlayFootball } from "react-icons/tb";
import { TbLayersDifference } from "react-icons/tb";

const TeamBlock = styled.div`
  margin: 20px 0;
`;

const ImageTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const TeamTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeamTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--color-secondary-500);
`;

const TeamPlace = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: var(--color-secondary-400);
`;

// Создаем стилизованную кнопку
const EmptyLink = styled(NavLink)`
  background-color: transparent; /* Прозрачный фон */
  border: none; /* Убираем рамку */
  padding: 0; /* Отсутствие внутренних отступов */
  margin: 0; /* Отсутствие внешних отступов */
  cursor: pointer; /* Меняем курсор на указатель */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Добавляем анимацию для трансформации и теней */

  :focus {
    outline: none; /* Убираем стандартный outline */
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* Пользовательский фокус */
  }
`;

const StyledInfoContainer = styled(InfoContainer)`
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Тень при наведении */
    transition: box-shadow 0.1s ease-in-out; /* Плавная анимация тени */
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const StyledDetailItem = styled(DetailItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function TeamCard({ team }) {
  const { leagueId } = useParams(); // Получаем параметр

  return (
    <TeamBlock>
      <EmptyLink to={`/teams/league/${leagueId}/team/${team.id}`}>
        <StyledInfoContainer
          light="light"
          width="350px"
          height="140px"
          direction="column"
          alignItems="flex-start"
        >
          <Row gap={2}>
            <Row type="horizontal">
              <ImageTitleContainer>
                <Avatar
                  src={team.imageUrl}
                  alt={`Avatar of ${team.name}`}
                  sx={{
                    width: 50,
                    height: 50,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
                <TeamTitleContainer>
                  <TeamTitle>{team.teamName}</TeamTitle>
                  <TeamPlace>Текущее место: {team.place}</TeamPlace>
                </TeamTitleContainer>
              </ImageTitleContainer>
            </Row>
          </Row>

          <DetailsContainer>
            <StyledDetailItem
              size="24px"
              icon={<GiSoccerBall />}
              color="#54577A"
            >
              Г: {team.scored}
            </StyledDetailItem>
            <StyledDetailItem
              icon={<TbPlayFootball />}
              size="24px"
              color="#54577A"
            >
              П: {team.missed}
            </StyledDetailItem>
            <StyledDetailItem
              icon={<TbLayersDifference />}
              size="24px"
              color="#54577A"
            >
              W/L: ({team.wins}/{team.losses})
            </StyledDetailItem>
          </DetailsContainer>
        </StyledInfoContainer>
      </EmptyLink>
    </TeamBlock>
  );
}

export default TeamCard;
