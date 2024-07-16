import styled from "styled-components";

const PhoneLink = styled.a`
  display: flex;
  align-items: center;
  color: #0088cc; /* Цвет ссылки */
  text-decoration: none; /* Убирает подчеркивание */
  &:hover {
    text-decoration: underline; /* Подчеркивание при наведении */
    color: var(--color-blue-700);
  }
`;
export default PhoneLink;
