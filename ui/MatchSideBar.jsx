import styled from "styled-components";
import MatchSideBarLoadingIndicator from "./MatchSideBarLoadingIndicator";

// Определение стилей для элемента li
const MatchLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;

  height: 62px;
  padding: 8px 14px;
  border-radius: var(--border-radius-lg-pfl);

  background-color: #f5f5f7;
`;

// Определение стилей для контейнера изображения команды
const TeamImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; // Центрирование изображения внутри контейнера
  border: 1px solid;
  border-color: ${(props) =>
    props.borderColor || "transparent"}; // Установка цвета границы

  border-radius: 50%; // Круглая форма
  width: 35px;
  height: 35px; // Высота равна ширине для круга
  overflow: hidden; // Скрыть часть изображения за пределами контейнера
`;

// Определение стилей для изображения команды
const TeamImg = styled.img`
  width: 95%;
  height: 100%; // Изображение будет растягиваться, чтобы заполнить контейнер
  object-fit: cover; // Изображение покрывает весь контейнер, сохраняя пропорции
`;

const TeamsScoredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 100px;
`;

const TeamScore = styled.span`
  display: flex;
  font-size: 30px;
`;

function MatchSideBar({ match }) {
  // Определяем, какая команда выиграла или ничья
  const isTeam1Won = match.team1Scored > match.team2Scored;
  const isTeam2Won = match.team2Scored > match.team1Scored;
  const isDraw = match.team1Scored === match.team2Scored;

  const { isLoading } = match;

  // Устанавливаем цвет границы в зависимости от результатов матча
  const team1BorderColor = isTeam1Won
    ? "#9CD323" // Зеленый для победы команды 1
    : isDraw
    ? "#fff" // Черный для ничьей
    : "#FF4423"; // Красный для поражения команды 1

  const team2BorderColor = isTeam2Won
    ? "#9CD323" // Зеленый для победы команды 2
    : isDraw
    ? "#fff" // Черный для ничьей
    : "#FF4423"; // Красный для поражения команды 2

  if (isLoading === "remainder") return null;
  return (
    <MatchLi>
      {isLoading ? (
        <MatchSideBarLoadingIndicator />
      ) : (
        <>
          <TeamImgContainer borderColor={team1BorderColor}>
            <TeamImg src={match.team1ImgUrl} alt={`Logo of ${match.team1}`} />
          </TeamImgContainer>
          <TeamsScoredContainer>
            <TeamScore>{match.team1Scored}</TeamScore>-
            <TeamScore>{match.team2Scored}</TeamScore>
          </TeamsScoredContainer>
          <TeamImgContainer borderColor={team2BorderColor}>
            <TeamImg src={match.team2ImgUrl} alt={`Logo of ${match.team2}`} />
          </TeamImgContainer>
        </>
      )}
    </MatchLi>
  );
}

export default MatchSideBar;
