import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useTeamContext } from "./Team";
import InfoContainer from "../../ui/InfoContainer";
import Row from "../../ui/Row";
import CustomTooltip from "../../ui/CustomTooltip";
import { generateMonthlyData, filterWeekData } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { useTeamPaginationContext } from "./TeamChartPagination";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const TeamBlock = styled.div`
  margin: 20px 0;
`;

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 120px;
  border-radius: var(--border-radius-lg-pfl);
  background-color: #fff;
  padding: 10px;
  animation: ${fadeIn} 1s ease-out;
`;

const StatisticsTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatisticsTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const StyledMenu = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.4rem;
  font-weight: 500;
`;

const NoMatchesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  font-weight: 600;

  background-color: #fff;
  width: 400px;
  height: 160px;

  border-radius: var(--border-radius-lg-pfl);
`;

const CustomTick = ({ x, y, payload }) => (
  <text x={x} y={y} dy={16} textAnchor="middle" fill="#141522" fontSize={12}>
    {payload.value}
  </text>
);

// Функция для получения строки недели
const getWeekTitle = (currentPage, currentWeekStart) => {
  if (currentPage === 0) {
    return "Текущая неделя";
  } else if (currentPage === 1) {
    return "Следующая неделя";
  } else if (currentPage === -1) {
    return "Предыдущая неделя";
  } else {
    // Вычисляем даты начала и конца недели
    const startDate = new Date(currentWeekStart);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    // Форматирование даты в 'dd MMM'
    const options = { month: "short", day: "numeric" };
    const startFormatted = startDate.toLocaleDateString("ru-RU", options);
    const endFormatted = endDate.toLocaleDateString("ru-RU", options);

    return `${startFormatted} - ${endFormatted}`;
  }
};

const TeamChart = () => {
  const { pointsChart } = useTeamContext();
  const { currentPage, currentWeekStart, handlePrevWeek, handleNextWeek } =
    useTeamPaginationContext();

  if (!pointsChart || pointsChart.length === 0) {
    return (
      <TeamBlock>
        <InfoContainer
          light="light"
          width="460px"
          height="200px"
          direction="column"
        >
          <Row gap={1}>
            <StatisticsTitleContainer>
              <NoMatchesContainer>Нет сыгранных матчей</NoMatchesContainer>
            </StatisticsTitleContainer>
          </Row>
        </InfoContainer>
      </TeamBlock>
    );
  }

  const monthlyData = generateMonthlyData(pointsChart);
  const chartData = filterWeekData(monthlyData, currentWeekStart);

  return (
    <Menus>
      <TeamBlock>
        <InfoContainer
          light="light"
          width="460px"
          height="200px"
          direction="column"
        >
          <Row gap={1}>
            <StatisticsTitleContainer>
              <StatisticsTitle>График результатов</StatisticsTitle>
              <StyledMenu>
                {getWeekTitle(currentPage, currentWeekStart)}
                <Menus.Toggle id="teamChart" />
              </StyledMenu>
              <Menus.List id="teamChart">
                <Menus.Button onClick={handlePrevWeek}>
                  Пред. неделя
                </Menus.Button>
                <Menus.Button onClick={handleNextWeek}>
                  След. неделя
                </Menus.Button>
              </Menus.List>
            </StatisticsTitleContainer>
            <ChartContainer>
              <LineChart
                width={400}
                height={120}
                data={chartData}
                margin={{ top: 30, right: 20, bottom: 0, left: -20 }}
              >
                <CartesianGrid stroke="#f5f5f5" horizontal={false} />

                <XAxis
                  dataKey="day"
                  axisLine={{ stroke: "none" }}
                  tick={<CustomTick />}
                  tickLine={false}
                />

                <YAxis
                  axisLine={{ stroke: "none" }}
                  tick={{ fill: "#141522", fontSize: 12 }}
                  tickLine={false}
                />

                <Tooltip content={<CustomTooltip />} />

                <Line
                  type="monotone"
                  dataKey="points"
                  stroke="#141522"
                  strokeWidth={3}
                  dot={{
                    stroke: "#546FFF",
                    strokeWidth: 4,
                    fill: "#fff",
                    r: 5,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </Row>
        </InfoContainer>
      </TeamBlock>
    </Menus>
  );
};

export default TeamChart;
