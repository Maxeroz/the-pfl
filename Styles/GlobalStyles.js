import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Ресет стили */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif; /* Замените на нужный шрифт */
    line-height: 1.5;
    background-color: #f8f9fa; /* Замените на нужный цвет фона */
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit; /* Унаследовать цвет от родителя */
  }

  ul {
    list-style: none; /* Убираем стандартные маркеры у списков */
  }
`;

export default GlobalStyles;
