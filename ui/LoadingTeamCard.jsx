import styled, { keyframes } from "styled-components";
import InfoContainer from "./InfoContainer";
import { Avatar } from "@mui/material";
import Row from "./Row";

// Анимация для переливающегося эффекта
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const ImageTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const TeamTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInfoContainer = styled(InfoContainer)`
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Тень при наведении */
    transition: box-shadow 0.1s ease-in-out; /* Плавная анимация тени */
  }
`;

const TeamBlock = styled.div`
  margin: 20px 0;
`;

// Стилизованный компонент для аватара заглушки с анимацией
const PlaceholderAvatar = styled(Avatar)`
  background: #8e92bc;

  width: 50px;
  height: 50px;
  border-radius: 50%;

  /* Стиль для переливающегося фона */
  background: linear-gradient(
    90deg,
    var(--color-secondary-300) 25%,
    #8e92bc7f 50%,
    #8e92bc 75%
  );
  background-size: 200% 100%;

  /* Анимация */
  animation: ${shimmer} 5s infinite linear;
`;

const PlaceholderText = styled.div`
  background: ${(props) => props.color};
  opacity: ${(props) => props.opacity};

  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
  margin: 4px 0;
  border-radius: 20px;
`;

const PlaceholderDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
`;

PlaceholderText.defaultProps = {
  height: 12,
  width: 100,
};

function LoadingTeamCard() {
  return (
    <TeamBlock>
      <StyledInfoContainer
        light="light"
        width="350px"
        height="140px"
        direction="column"
        alignItems="flex-start"
      >
        <Row gap={2}>
          <Row type="horizontal">
            <ImageTitleContainer>
              <PlaceholderAvatar />
              <TeamTitleContainer>
                <PlaceholderText color="#546fff" opacity="0.32" />
                <PlaceholderText color="#546fff" opacity="0.12" />
              </TeamTitleContainer>
            </ImageTitleContainer>
          </Row>
        </Row>
        <PlaceholderDetailsContainer>
          <PlaceholderText
            color="#546fff"
            width="15"
            opacity="0.32"
            height="15"
          />
          <PlaceholderText
            color="#546fff"
            width="80"
            opacity="0.32"
            height="15"
          />
          <PlaceholderText
            color="#546fff"
            width="15"
            opacity="0.32"
            height="15"
          />
          <PlaceholderText
            color="#546fff"
            width="80"
            opacity="0.32"
            height="15"
          />
          <PlaceholderText
            color="#546fff"
            width="15"
            opacity="0.32"
            height="15"
          />
          <PlaceholderText
            color="#546fff"
            width="80"
            opacity="0.32"
            height="15"
          />
        </PlaceholderDetailsContainer>
      </StyledInfoContainer>
    </TeamBlock>
  );
}

export default LoadingTeamCard;
