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

// Анимация плавного появления
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// Определяем дни недели
const daysOfWeek = ["M", "T", "W", "Th", "F", "S", "Su"];

// Функция для преобразования даты в день недели
const getDayOfWeek = (date) => {
  const day = new Date(date).getDay();
  return daysOfWeek[day];
};

// Функция для преобразования данных в формат для графика
const formatChartData = (pointsChart) => {
  const chartData = daysOfWeek.map((day) => ({ day, points: 0 }));

  // Создаем объект для хранения данных по дням недели
  let lastPoints = 0;

  pointsChart.forEach(({ date, points }) => {
    const day = getDayOfWeek(date);
    const index = daysOfWeek.indexOf(day);
    if (index !== -1) {
      lastPoints = points;
      chartData[index].points = points;
    }
  });

  // Присваиваем последние значения для промежуточных дней
  for (let i = 0; i < chartData.length; i++) {
    if (chartData[i].points === 0 && i > 0) {
      chartData[i].points = chartData[i - 1].points;
    }
  }

  return chartData;
};

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

  animation: ${fadeIn} 1s ease-out; /* Применение анимации плавного появления */
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

// Кастомная функция для отображения меток осей без засечек
const CustomTick = ({ x, y, payload }) => (
  <text x={x} y={y} dy={16} textAnchor="middle" fill="#141522" fontSize={12}>
    {payload.value}
  </text>
);

function TeamChart() {
  const { pointsChart, isLoading } = useTeamContext();

  if (!pointsChart || pointsChart.length === 0) {
    return null;
  }

  const chartData = formatChartData(pointsChart);

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
            <StatisticsTitle>График результатов</StatisticsTitle>
            <span>На этой неделе</span>
          </StatisticsTitleContainer>
          <ChartContainer>
            <LineChart
              width={400}
              height={120}
              data={chartData}
              margin={{ top: 30, right: 20, bottom: 0, left: -20 }}
            >
              <CartesianGrid
                // strokeDasharray="3 3"
                stroke="#f5f5f5"
                horizontal={false}
              />
              <XAxis
                dataKey="day"
                axisLine={{ stroke: "none" }}
                tick={{ fill: "#141522", fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                axisLine={{ stroke: "🔞 " }}
                tick={{ fill: "#141522", fontSize: 12 }}
                tickLine={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="points"
                stroke="#141522"
                strokeWidth={3}
                dot={{ stroke: "#546FFF", strokeWidth: 4, fill: "#fff", r: 5 }}
              />
            </LineChart>
          </ChartContainer>
        </Row>
      </InfoContainer>
    </TeamBlock>
  );
}

export default TeamChart;
