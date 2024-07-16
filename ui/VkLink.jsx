import styled from "styled-components";

const VkLink = styled.a`
  display: flex;
  align-items: center;
  color: #0088cc; /* Цвет ссылки VK */
  text-decoration: none; /* Убирает подчеркивание */

  font-size: 2rem;

  &:hover {
    text-decoration: underline; /* Подчеркивание при наведении */
    color: var(--color-red-700);
    cursor: pointer;
  }
`;

export default VkLink;
