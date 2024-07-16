import styled from "styled-components";

const EmailLink = styled.a`
  display: flex;
  align-items: center;

  color: #0088cc; /* Цвет ссылки */
  text-decoration: none; /* Убирает подчеркивание */

  &:hover {
    text-decoration: underline; /* Подчеркивание при наведении */
    color: var(--color-red-700);
    cursor: pointer;
  }
`;

export default EmailLink;
