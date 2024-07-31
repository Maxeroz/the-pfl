import styled from "styled-components";

// Используем пропс `as` для выбора HTML тега и `height` для изменения высоты
const TabelTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  line-height: ${(props) =>
    props.height || "1.2"}; // Изменение высоты строки (line-height)

  ${(props) =>
    props.height &&
    `
    font-size: ${props.height === "small" ? "18px" : "24px"};
  `}
`;

export default TabelTitle;
