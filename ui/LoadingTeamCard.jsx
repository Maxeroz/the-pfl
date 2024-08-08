import styled, { keyframes } from "styled-components";
import InfoContainer from "./InfoContainer";
import { Avatar } from "@mui/material";
import Row from "./Row";
import { shimmer } from "../utils/helpers";

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
  background: var(--color-secondary-300);

  width: 50px;
  height: 50px;
  border-radius: 50%;

  /* Стиль для переливающегося фона */
  background: linear-gradient(
    90deg,
    var(--color-secondary-200) 25%,
    var(--color-secondary-300) 50%,
    var(--color-secondary-400) 75%
  );
  background-size: 200% 100%;

  /* Анимация */
  animation: ${shimmer} 5s infinite linear;
`;

const PlaceholderText = styled.div`
  background: ${(props) => props.color || `var(--color-primary-500)`};
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
                <PlaceholderText opacity="0.32" />
                <PlaceholderText opacity="0.12" />
              </TeamTitleContainer>
            </ImageTitleContainer>
          </Row>
        </Row>
        <PlaceholderDetailsContainer>
          <PlaceholderText width="15" opacity="0.32" height="15" />
          <PlaceholderText width="80" opacity="0.32" height="15" />
          <PlaceholderText width="15" opacity="0.32" height="15" />
          <PlaceholderText width="80" opacity="0.32" height="15" />
          <PlaceholderText width="15" opacity="0.32" height="15" />
          <PlaceholderText width="80" opacity="0.32" height="15" />
        </PlaceholderDetailsContainer>
      </StyledInfoContainer>
    </TeamBlock>
  );
}

export default LoadingTeamCard;
