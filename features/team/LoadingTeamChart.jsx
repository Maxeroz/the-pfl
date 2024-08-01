import styled, { keyframes } from "styled-components";
import InfoContainer from "../../ui/InfoContainer";
import Row from "../../ui/Row";

// Анимация переливающегося эффекта
const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

// Анимация плавного появления
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

const ChartPlaceholderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px; /* Фиксированная ширина для заглушки */
  height: 120px; /* Высота для заглушки */
  border-radius: var(--border-radius-lg-pfl);
  background-color: #fff;
  padding: 10px;
  animation: ${fadeIn} 1s ease-out; /* Применение анимации плавного появления */
`;

const PlaceholderTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const PlaceholderTitle = styled.div`
  background-color: var(--color-grey-0);
  opacity: 0.6;
  height: 18px;
  width: 150px;
  border-radius: var(--border-radius-lg-pfl);
  animation: ${shimmer} 2s infinite linear;
`;

const PlaceholderChart = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-secondary-300) 25%,
    #8e92bc7f 50%,
    #8e92bc 75%
  );
  background-size: 800px 100%; /* Увеличенная ширина фона для перекрытия ширины 400px */
  animation: ${shimmer} 2s infinite linear;
  border-radius: var(--border-radius-lg-pfl);
`;

function LoadingTeamChart() {
  return (
    <TeamBlock>
      <InfoContainer
        light="light"
        width="460px"
        height="200px"
        direction="column"
      >
        <Row gap={1}>
          <PlaceholderTitleContainer>
            <PlaceholderTitle />
          </PlaceholderTitleContainer>
          <ChartPlaceholderContainer>
            <PlaceholderChart />
          </ChartPlaceholderContainer>
        </Row>
      </InfoContainer>
    </TeamBlock>
  );
}

export default LoadingTeamChart;
