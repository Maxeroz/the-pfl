import styled, { keyframes } from "styled-components";
import InfoContainer from "../../ui/InfoContainer";

// Анимация переливающегося эффекта
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
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

  animation: ${fadeIn} 0.3s ease-out; /* Применение анимации плавного появления */
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;
`;

// Стиль для заглушки вместо изображения
const PlaceholderLogo = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    var(--color-secondary-300) 25%,
    #8e92bc7f 50%,
    #8e92bc 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 5s infinite linear;
`;

const ScoredContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlaceholderText = styled.div`
  background-color: var(--color-grey-0);
  /* background: var(--color-primary-500); */
  opacity: 1;
  height: ${(props) => props.height || "20px"};
  width: ${(props) => props.width || "100%"};
  margin: 4px 0;
  border-radius: 5px;
  animation: ${shimmer} 5s infinite linear;
`;

// Заглушка для имени команды и места
const PlaceholderTitle = styled(PlaceholderText)`
  width: 116px;
  height: 18px;

  border-radius: var(--border-radius-lg-pfl);
`;

const PlaceholderPlace = styled(PlaceholderText)`
  width: 120px;
  height: 32px;

  border-radius: var(--border-radius-lg-pfl);
`;

const PlaceholderScored = styled(PlaceholderText)`
  width: 50px;
  height: 20px;

  border-radius: var(--border-radius-lg-pfl);
`;

const PlaceholderDetailsScored = styled(PlaceholderText)`
  width: 40px;
  height: 12px;

  border-radius: var(--border-radius-lg-pfl);
`;

function LoadingTeamInfo() {
  return (
    <TeamBlock>
      <InfoContainer width="215px" height="200px" direction="column">
        <TitleContainer>
          <PlaceholderTitle />
          <PlaceholderPlace />
        </TitleContainer>
        <LogoContainer>
          <PlaceholderLogo />
          <ScoredContainer>
            <PlaceholderScored />
            <PlaceholderDetailsScored />
          </ScoredContainer>
        </LogoContainer>
      </InfoContainer>
    </TeamBlock>
  );
}

export default LoadingTeamInfo;
