import styled, { css, keyframes } from "styled-components";
import ReusableModalWindow from "./ReusableModalWindow";
import Button from "./Button";
import { useEffect, useState } from "react";
import { usePlanMatches } from "../features/team/usePlanMatches";
import MatchSideBar from "./MatchSideBar";
import { Box, LinearProgress } from "@mui/material";
import { useAdmin } from "../hooks/useAdmin";

// Стилизованный компонент для отображения прогресса загрузки
const StyledPrimaryLinearProgress = styled(LinearProgress)`
  && {
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

// Анимация для плавного появления элементов
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: ${(props) => props.width || "100px"};
  height: ${(props) => (props.isFixedHeight ? "500px" : "auto")};
  padding: 24px;
  gap: 20px;
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
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
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
  transition: opacity 0.5s ease-in-out;
`;

function ScheduledMathes({ light, width }) {
  const [isVisible, setIsVisible] = useState(false);
  const { isAdmin } = useAdmin();

  const { planMatches, isLoading } = usePlanMatches();

  useEffect(() => {
    if (!isLoading && planMatches) {
      setIsVisible(true);
    }
  }, [isLoading, planMatches]);

  return (
    <StyledContainer light={light} width={width}>
      <StatisticsTitle>Предстоящие матчи: </StatisticsTitle>

      {isLoading ? (
        <Box>
          <StyledPrimaryLinearProgress />
        </Box>
      ) : (
        planMatches.length > 0 && (
          <MatchesContainer>
            <MatchesUl>
              {planMatches?.map((match, index) => (
                <MatchLi key={match.id} isVisible={isVisible}>
                  <MatchSideBar match={match} />
                </MatchLi>
              ))}
            </MatchesUl>
          </MatchesContainer>
        )
      )}

      {isAdmin && (
        <ReusableModalWindow.ToggleButton id="planMatch">
          <Button width={200}>Запланировать матч</Button>
        </ReusableModalWindow.ToggleButton>
      )}
    </StyledContainer>
  );
}

export default ScheduledMathes;
