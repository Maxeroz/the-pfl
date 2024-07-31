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
  background: #e0e0e0;
  background-image: linear-gradient(
    90deg,
    #e0e0e0 0px,
    #f0f0f0 40px,
    #e0e0e0 80px
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const PlaceholderText = styled.div`
  background: #e0e0e0;
  background-image: linear-gradient(
    90deg,
    #e0e0e0 0px,
    #f0f0f0 40px,
    #e0e0e0 80px
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;
  height: 12px;
  width: 80%;
  margin: 4px 0;
  border-radius: 4px;
`;

const PlaceholderDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
                <PlaceholderText style={{ width: "50%" }} />
                <PlaceholderText style={{ width: "30%" }} />
              </TeamTitleContainer>
            </ImageTitleContainer>
          </Row>
        </Row>
        <PlaceholderDetailsContainer>
          <PlaceholderText style={{ width: "25%" }} />
          <PlaceholderText style={{ width: "25%" }} />
          <PlaceholderText style={{ width: "30%" }} />
        </PlaceholderDetailsContainer>
      </StyledInfoContainer>
    </TeamBlock>
  );
}

export default LoadingTeamCard;
