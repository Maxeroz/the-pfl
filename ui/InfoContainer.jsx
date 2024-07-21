import styled, { keyframes } from "styled-components";

// Анимация плавного появления
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Изменяемый стилизованный компонент с пропсами для ширины, высоты и фона
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 10px;

  background-color: ${(props) =>
    props.light === "light" ? "#F5F5F7" : "#141522"};
  border-radius: var(--border-radius-lg-pfl);
  padding: 20px;

  color: ${(props) => (props.light === "light" ? "#141522" : "#fff")};

  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "auto"};

  animation: ${fadeIn} 0.1s ease-in-out; // Применение анимации
`;

export default InfoContainer;
