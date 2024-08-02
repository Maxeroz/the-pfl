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

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <StyledTooltipContainer>
        <strong>День: {label}</strong>
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
