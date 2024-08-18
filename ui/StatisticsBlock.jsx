import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useMatches } from "../features/matchStatistics/useMatches";
import { Box, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { getRandomNumberFromDate } from "../utils/helpers";

import MatchSideBar from "./MatchSideBar";

// Анимация для плавного появления элементов
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Стилизованный компонент для отображения прогресса загрузки
const StyledPrimaryLinearProgress = styled(LinearProgress)`
  && {
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

// Стилизованный контейнер для блока статистики
const StatisticsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: ${(props) => props.width || "100px"};
  height: ${(props) => (props.isFixedHeight ? "400px" : "auto")};

  padding: 24px;
  gap: 15px;

  background-color: ${(props) =>
    props.light === "light"
      ? `var(--color-grey-0)`
      : `var(--color-secondary-500)`};

  border-radius: var(--border-radius-lg-pfl);
  position: relative;
  transition: height 0.5s ease-in-out, opacity 0.5s ease-in-out;
`;

// Стилизованный заголовок для блока статистики
const StatisticsTitle = styled.h3`
  font-size: 14px;
`;

// Стилизованный контейнер для списка матчей
const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: var(--input-border-color);
  padding: 14px;

  border-radius: var(--border-radius-lg-pfl);
  height: ${(props) => (props.isFixedHeight ? "324px" : "auto")};

  overflow-y: auto;
  transition: height 0.3s ease-in-out;
  position: relative;
`;

// Стилизованный список матчей
const MatchesUl = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 15px;
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
`;

// Стилизованный текстовый компонент
const SupportTextSpan = styled.span`
  font-size: 12px;
  color: var(--color-secondart-400);
`;

// Стилизованный контейнер для элементов
const ElementsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

// Стилизованный контейнер для кнопок пагинации
const PaginationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`;

const CommonButton = styled.button`
  /* Обычные стили для обеих кнопок */
  padding: 4px 14px;
  border-radius: var(--border-radius-lg-pfl);

  border-style: none;
  font-size: 14px;
  cursor: pointer;

  color: #fff;
  background-color: var(--color-primary-500);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-secondary-500);
  }
`;

const ButtonPrev = styled(CommonButton)`
  margin-right: auto; /* Перемещает кнопку влево */
`;

const ButtonNext = styled(CommonButton)`
  margin-left: auto; /* Перемещает кнопку вправо */
`;

function StatisticsBlock({ light, width, height }) {
  // Получаем данные о матчах и состояние загрузки
  const { isLoading, data: matches } = useMatches();
  const [currentPage, setCurrentPage] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleMatches, setVisibleMatches] = useState([]);

  const { isPending } = useSelector((state) => state.match.currentTeam);

  const matchesPerPage = 3;
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;

  // Обновление списка видимых матчей при изменении состояния загрузки
  useEffect(() => {
    if (isPending) {
      setVisibleMatches((prevMatches) => {
        const prevMatchesCheck = prevMatches.length % 3 === 0;

        return [
          ...prevMatches,
          prevMatchesCheck
            ? { id: getRandomNumberFromDate(), isLoading: "remainder" }
            : { id: getRandomNumberFromDate(), isLoading: true },
        ];
      });
    }
  }, [isPending]);

  // Обновление списка видимых матчей при изменении матчей или текущей страницы
  useEffect(() => {
    if (matches) {
      setVisibleMatches(matches.slice(indexOfFirstMatch, indexOfLastMatch));
    }
  }, [matches, currentPage]);

  // Установка видимости после завершения загрузки
  useEffect(() => {
    if (!isLoading) {
      setIsVisible(true);
    }
  }, [isLoading, visibleMatches]);

  // Проверка, если высота должна быть фиксированной
  const isFixedHeight = matches?.length > 3;

  // Обработчик для перехода к следующей странице
  const handleNextPage = () => {
    if (currentPage * matchesPerPage < (matches?.length || 0)) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setFadeIn(true);
      }, 300);
    }
  };

  // Обработчик для перехода к предыдущей странице
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setFadeIn(true);
      }, 300);
    }
  };

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
                {visibleMatches
                  .filter((match) => match.isFinished === true)
                  .map((match, index) => (
                    <MatchLi
                      key={match.id}
                      isVisible={isVisible}
                      delay={index * 0.1}
                    >
                      <MatchSideBar match={match} />
                    </MatchLi>
                  ))}
              </MatchesUl>
            </ElementsWrapper>

            {matches?.length > matchesPerPage && (
              <PaginationButtons>
                {currentPage > 1 && (
                  <ButtonPrev onClick={handlePrevPage}>Предыдущая</ButtonPrev>
                )}
                {currentPage < Math.ceil(matches.length / matchesPerPage) && (
                  <ButtonNext onClick={handleNextPage}>Следующая</ButtonNext>
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
