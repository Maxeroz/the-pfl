import styled from "styled-components";

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
`;

export default InfoContainer;
