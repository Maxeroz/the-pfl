import styled from "styled-components";

// Оформление контейнера тултипа
const StyledTooltipContainer = styled.div`
  background-color: var(--color-secondary-500);
  border-radius: var(--border-radius-lg-pfl);
  padding: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: var(--color-grey-0);
`;

function formatDate(dateString) {
  // Создаем объект Date из строки
  const date = new Date(dateString);

  // Определяем массив сокращенных названий месяцев на русском
  const monthNames = [
    "янв.",
    "фев.",
    "март",
    "апр.",
    "май",
    "июнь",
    "июль",
    "авг.",
    "сент.",
    "окт.",
    "ноя.",
    "дек.",
  ];

  // Извлекаем день и месяц из объекта Date
  const day = date.getDate();
  const month = date.getMonth(); // Месяцы в JavaScript начинаются с 0

  // Форматируем дату
  return `${day} ${monthNames[month]}`;
}

function CustomTooltip({ active, payload }) {
  const date = payload[0]?.payload.date;

  if (active && payload && payload.length) {
    return (
      <StyledTooltipContainer>
        <strong>День: {formatDate(date)}</strong>
        <br />
        {payload.map((element, i) => (
          <span key={i}>Очки : {element.value}</span>
        ))}
      </StyledTooltipContainer>
    );
  }

  return null;
}

export default CustomTooltip;
