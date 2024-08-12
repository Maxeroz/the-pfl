import { NavLink } from "react-router-dom";
import styled from "styled-components";
import // HiClipboardDocumentList,
// HiHome,
// HiMiniTableCells,
// HiMiniUserCircle,
// HiOutlineNewspaper,
// HiOutlineSquare3Stack3D,
// HiOutlineUserGroup,
// HiQueueList,
"react-icons/hi2";
import Icon from "./Icon";

// Стили для навигационного бара
const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: column;

  color: var(--color-secondary--500);
  background-color: #fff; /* Цвет фона навигационного бара */

  padding: 0 2.5rem;
  height: 100vh; /* Полная высота экрана */

  @media (max-width: 1280px) {
    width: 180px;
  }

  @media (max-width: 1024px) {
    width: 180px;
  }
`;

// Стили для списка навигации
const Ul = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 24px;

  list-style: none;
  height: calc(
    100% - 40px
  ); /* Высота списка, учитывая padding сверху и снизу */
`;

// Стили для элементов списка
const Li = styled.li`
  margin: 0;
`;

// Стили для навигационных ссылок
const StyledNavLink = styled(NavLink)`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.3rem 2rem;

  gap: 12px;

  font-size: 16px;
  font-weight: 600;
  line-height: 21px;

  border-radius: var(--border-radius-lg-pfl);
  /* padding: 10px 16px; */

  color: var(--color-secondary-300);
  text-decoration: none;

  &.active {
    font-weight: bold;
    color: var(--color-secondary-500);
    background-color: #f5f5f7;
  }

  @media (max-width: 1280px) {
    font-size: 14px;
    padding: 0rem 0.5rem;
  }

  @media (max-width: 1000px) {
    font-size: 14px;
    padding: 1rem 1rem;
  }
`;

// Стили для заголовков ссылок
const LinkTitle = styled.span`
  @media (max-width: 1000px) {
    display: none;
  }
`;

// Основной компонент Navbar
const Navbar = ({ options }) => {
  return (
    <Nav>
      <Ul>
        {options.map((option) => (
          <Li key={option.title}>
            <StyledNavLink to={option.to}>
              <Icon>{option.icon}</Icon>
              <LinkTitle>{option.title}</LinkTitle>
            </StyledNavLink>
          </Li>
        ))}
      </Ul>
    </Nav>
  );
};

export default Navbar;
