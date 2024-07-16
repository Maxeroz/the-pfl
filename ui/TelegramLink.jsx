import styled from "styled-components";

const TelegramLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: #0088cc; /* Цвет ссылки */
  text-decoration: none; /* Убирает подчеркивание */

  &:hover {
    text-decoration: underline; /* Подчеркивание при наведении */
    color: var(--color-blue-700);
    cursor: pointer;
  }
`;

export default TelegramLink;
