import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useMatches } from "../features/matchStatistics/useMatches";
import { Box, LinearProgress, Button } from "@mui/material";
import MatchSideBar from "./MatchSideBar";
import { useSelector } from "react-redux";

// Анимация плавного появления
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Стилизованный LinearProgress с использованием цвета из темы
const StyledPrimaryLinearProgress = styled(LinearProgress)`
  && {
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const StatisticsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: ${(props) => props.width || "100px"};
  height: ${(props) =>
    props.isFixedHeight ? "390px" : "auto"}; // Устанавливаем высоту
  padding: 24px;

  gap: 10px;

  background-color: ${(props) =>
    props.light === "light" ? "#F5F5F7" : "#141522"};
  border-radius: var(--border-radius-lg-pfl);
  position: relative;

  transition: height 0.5s ease-in-out, opacity 0.5s ease-in-out; // Переход для плавного изменения высоты и непрозрачности
`;

const StatisticsTitle = styled.h3`
  font-size: 14px;
`;

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  padding: 14px;
  border-radius: var(--border-radius-lg-pfl);
  height: ${(props) =>
    props.isFixedHeight ? "324px" : "auto"}; // Устанавливаем высоту
  overflow-y: auto; // Добавляем прокрутку по вертикали, если контент превышает высоту
  transition: height 0.3s ease-in-out; // Переход для плавного изменения высоты
  position: relative;
`;

const MatchesUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* transition: opacity 0.3s ease; // Переход для плавного изменения непрозрачности списка матчей */
  opacity: ${(props) => (props.fadeIn ? 1 : 0)};
`;

// Стилизованный компонент для каждого элемента списка матчей с анимацией
const MatchLi = styled.li`
  opacity: 1;
  animation: ${(props) =>
    props.isVisible
      ? css`
          ${fadeIn} 0.5s forwards
        `
      : "none"};
  /* animation-delay: ${(props) =>
    props.delay}s; // Задержка анимации для каскадного эффекта */
`;

const SupportTextSpan = styled.span`
  font-size: 12px;
  color: var(--color-secondart-400);
`;

const ElementsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

function StatisticsBlock({ light, width, height }) {
  // Получаем данные о матчах и состояние загрузки
  const { isLoading, data: matches } = useMatches();
  const [currentPage, setCurrentPage] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);
  const [isVisible, setIsVisible] = useState(false); // Состояние видимости для анимации
  const [visibleMatches, setVisibleMatches] = useState([]); // Изменено: инициализация состояния visibleMatches

  const { isPending } = useSelector((state) => state.match.currentTeam);

  const matchesPerPage = 3; // Количество матчей на одной странице
  // Определяем матчи для текущей страницы
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;

  useEffect(() => {
    if (isPending) {
      setVisibleMatches((prevMatches) =>
        [...prevMatches, { id: 99, isLoading: true }].slice(
          indexOfFirstMatch,
          indexOfLastMatch
        )
      ); // Изменено: Обработка состояния загрузки isPending
    }
  }, [isPending]);

  useEffect(() => {
    if (matches && matches.length > 0) {
      setVisibleMatches(matches.slice(indexOfFirstMatch, indexOfLastMatch)); // Изменено: Обновление visibleMatches при изменении текущей страницы и матчей
    }
  }, [matches, currentPage]); // Изменено: Добавление currentPage в зависимости эффекта

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(true); // Устанавливаем состояние видимости после завершения загрузки
    }
  }, [isLoading, visibleMatches]);

  // Определение, если высота должна быть фиксированной
  const isFixedHeight = matches?.length > 3;

  // Обработчик для перехода к следующей странице
  const handleNextPage = () => {
    if (currentPage * matchesPerPage < (matches?.length || 0)) {
      setFadeIn(false); // Убираем плавность
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setFadeIn(true); // Добавляем плавность после изменения страницы
      }, 300); // Задержка соответствует времени анимации
    }
  };

  // Обработчик для перехода к предыдущей странице
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setFadeIn(false); // Убираем плавность
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setFadeIn(true); // Добавляем плавность после изменения страницы
      }, 300); // Задержка соответствует времени анимации
    }
  };

  useEffect(() => {
    if (matches?.length < currentPage * matchesPerPage) {
      setCurrentPage(1); // Изменено: Сброс текущей страницы, если количество матчей меньше
    }
  }, [matches]);

  return (
    <StatisticsDiv
      light={light}
      width={width}
      height={height}
      isFixedHeight={isFixedHeight}
    >
      {isLoading ? (
        <Box sx={{ width: { width } }}>
          <StyledPrimaryLinearProgress />
        </Box>
      ) : (
        <>
          <StatisticsTitle>Статистика за сегодня:</StatisticsTitle>

          <MatchesContainer isFixedHeight={isFixedHeight}>
            <ElementsWrapper>
              <SupportTextSpan>Сыгранные матчи:</SupportTextSpan>
              <MatchesUl fadeIn={fadeIn}>
                {visibleMatches.map((match, index) => (
                  <MatchLi
                    key={match.id}
                    isVisible={isVisible}
                    delay={index * 0.1} // Задержка для создания каскадного эффекта
                  >
                    <MatchSideBar match={match} />
                  </MatchLi>
                ))}
              </MatchesUl>
            </ElementsWrapper>

            {matches?.length > matchesPerPage && (
              <PaginationButtons>
                {currentPage > 1 && (
                  <Button onClick={handlePrevPage}>Предыдущая</Button>
                )}
                {currentPage < Math.ceil(matches.length / matchesPerPage) && (
                  <Button onClick={handleNextPage}>Следующая</Button>
                )}
              </PaginationButtons>
            )}
          </MatchesContainer>
        </>
      )}
    </StatisticsDiv>
  );
}

export default StatisticsBlock;
