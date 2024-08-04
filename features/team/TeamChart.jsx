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

const CustomTick = ({ x, y, payload }) => (
  <text x={x} y={y} dy={16} textAnchor="middle" fill="#141522" fontSize={12}>
    {payload.value}
  </text>
);

const TeamChart = () => {
  const { pointsChart } = useTeamContext();
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - day + (day === 0 ? -6 : 1)); // Пн
    return startOfWeek.toISOString().split("T")[0];
  });

  if (!pointsChart || pointsChart.length === 0) {
    return null;
  }

  const monthlyData = generateMonthlyData(pointsChart);
  const chartData = filterWeekData(monthlyData, currentWeekStart);

  const handlePrevWeek = () => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() - 7);
    setCurrentWeekStart(date.toISOString().split("T")[0]);
  };

  const handleNextWeek = () => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + 7);
    setCurrentWeekStart(date.toISOString().split("T")[0]);
  };

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
                Эта неделя
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
