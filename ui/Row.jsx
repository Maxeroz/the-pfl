import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      gap: ${props.gap}rem;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex: 1;
      flex-direction: column;
      gap: ${props.gap}rem;
    `} /* @media (max-width: 685px) {
    flex-direction: column;
    align-items: flex-start;
  } */
`;

Row.defaultProps = {
  type: "vertical", // Дефолтное поведение - вертикальное отображение
};

export default Row;
