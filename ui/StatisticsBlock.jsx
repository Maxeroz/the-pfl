import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useMatches } from "../features/matchStatistics/useMatches";
import { Box, LinearProgress, Button } from "@mui/material";
import MatchSideBar from "./MatchSideBar";

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

const StatisticsTitle = styled.h3`
  font-size: 14px;
`;

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  padding: 14px;
  border-radius: var(--border-radius-lg-pfl);
`;

const AnimatedMatchesUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  animation: ${fadeIn} 0.5s ease-in-out; // Применение анимации
`;

const SupportTextSpan = styled.span`
  font-size: 12px;
  color: var(--color-secondart-400);
`;

const StatisticsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "auto"};
  padding: 24px;
  gap: 10px;
  background-color: ${(props) =>
    props.light === "light" ? "#F5F5F7" : "#141522"};
  border-radius: var(--border-radius-lg-pfl);
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

function StatisticsBlock({ light, width, height }) {
  const { isLoading, data: matches, error } = useMatches();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAuto, setIsAuto] = useState(true); // Состояние для автоматического переключения
  const matchesPerPage = 3;
  const totalPages = Math.ceil((matches?.length || 0) / matchesPerPage);

  // Определение матчей для текущей страницы
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches?.slice(indexOfFirstMatch, indexOfLastMatch);

  // Обработчики кнопок пагинации
  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
    setIsAuto(false); // Отключаем автоматическое переключение при ручном изменении страницы
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
    setIsAuto(false); // Отключаем автоматическое переключение при ручном изменении страницы
  };

  // Автоматическая смена страниц каждые 10 секунд
  useEffect(() => {
    if (isAuto) {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
      }, 10000); // 10 секунд

      return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }
  }, [isAuto, totalPages]);

  // Переключение в автоматический режим при загрузке данных
  useEffect(() => {
    setIsAuto(true);
    setCurrentPage(1); // Сброс страницы на 1 при новой загрузке данных
  }, [matches]);

  return (
    <StatisticsDiv light={light} width={width} height={height}>
      {isLoading ? (
        <Box sx={{ width: { width } }}>
          <StyledPrimaryLinearProgress />
        </Box>
      ) : (
        <>
          <StatisticsTitle>Статистика за сегодня:</StatisticsTitle>

          <MatchesContainer>
            <SupportTextSpan>Сыгранные матчи:</SupportTextSpan>
            <AnimatedMatchesUl>
              {currentMatches.map((match) => (
                <MatchSideBar match={match} key={match.id} />
              ))}
            </AnimatedMatchesUl>
            <PaginationButtons>
              {currentPage > 1 && (
                <Button onClick={handlePrevPage}>Предыдущая</Button>
              )}
              {currentPage < totalPages && (
                <Button onClick={handleNextPage}>Следующая</Button>
              )}
            </PaginationButtons>
          </MatchesContainer>
        </>
      )}
    </StatisticsDiv>
  );
}

export default StatisticsBlock;
