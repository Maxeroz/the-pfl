import styled, { keyframes } from "styled-components";
import InfoContainer from "../../ui/InfoContainer";
import { useTeamContext } from "./Team";

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

  animation: ${fadeIn} 0.1s ease-out; /* Применение анимации плавного появления */
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 16px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const Place = styled.span`
  font-size: 32px;
`;

const LogoContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  gap: 18px;
`;

const Logo = styled.img`
  background-color: var(--input-border-color);

  object-fit: contain;

  width: 68px;
  height: 68px;
  border: 3px solid var(--color-primary-500);

  border-radius: 50%;
`;

const ScoredContainer = styled.div`
  display: flex;

  flex-direction: column;
  gap: 4px;
`;

const Scored = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const DetailsScored = styled.span`
  color: var(--color-secondary-300);
`;

function TeamInfoCard() {
  const { teamName, place, imageUrl, scored } = useTeamContext();

  return (
    <TeamBlock>
      <InfoContainer width="215px" height="200px" direction="column">
        <TitleContainer>
          <Title>{teamName}</Title>
          <Place>Место: {place}</Place>
        </TitleContainer>
        <LogoContainer>
          <Logo src={imageUrl} />
          <ScoredContainer>
            <Scored>{scored}</Scored>
            <DetailsScored>Голы</DetailsScored>
          </ScoredContainer>
        </LogoContainer>
      </InfoContainer>
    </TeamBlock>
  );
}

export default TeamInfoCard;
