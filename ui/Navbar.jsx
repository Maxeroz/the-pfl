import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiClipboardDocumentList,
  HiHome,
  HiMiniTableCells,
  HiMiniUserCircle,
  HiOutlineNewspaper,
  HiOutlineSquare3Stack3D,
  HiOutlineUserGroup,
  HiQueueList,
} from "react-icons/hi2";
import Icon from "./Icon";

// Стили для навигационного бара
const Nav = styled.nav`
  color: var(--color-secondary--500);
  padding: 20px; /* Фиксированное расстояние от границ навигационного бара */
  background-color: #fff; /* Цвет фона навигационного бара */

  height: 100vh; /* Полная высота экрана */
`;

// Стили для списка навигации
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  gap: 24px;

  list-style: none;
  padding: 0; /* Убираем отступы */
  margin: 0; /* Убираем внешние отступы */
  height: calc(
    100% - 40px
  ); /* Высота списка, учитывая padding сверху и снизу */
`;

// Стили для элементов списка
const Li = styled.li`
  margin: 0; /* Убираем внешние отступы у элементов списка */
`;

// Стили для навигационных ссылок
const StyledNavLink = styled(NavLink)`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 12px;

  font-size: 14px;
  font-weight: 600;
  line-height: 21px;

  border-radius: var(--border-radius-lg-pfl);
  padding: 10px 16px; /* Уменьшил padding для управления шириной */

  color: var(--color-secondary-300);
  text-decoration: none;

  &.active {
    font-weight: bold;
    color: var(--color-secondary-500);
    background-color: #f5f5f7;
  }
`;

// Стили для заголовков ссылок
const LinkTitle = styled.span`
  @media (max-width: 900px) {
    display: none;
  }
`;

// Основной компонент Navbar
const Navbar = () => {
  return (
    <Nav>
      <Ul>
        <Li>
          <StyledNavLink to="/profile">
            <Icon>
              <HiHome />
            </Icon>
            <LinkTitle>Профиль</LinkTitle>
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/applications">
            <Icon>
              <HiClipboardDocumentList />
            </Icon>
            <LinkTitle>Заявки</LinkTitle>
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/games">
            <Icon>
              <HiOutlineSquare3Stack3D />
            </Icon>
            <LinkTitle>Игры</LinkTitle>
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/table">
            <Icon>
              <HiMiniTableCells />
            </Icon>
            <LinkTitle>Таблица</LinkTitle>
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/statistics">
            <Icon>
              <HiQueueList />
            </Icon>
            <LinkTitle>Статистика</LinkTitle>
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/news">
            <Icon>
              <HiOutlineNewspaper />
            </Icon>
            <LinkTitle>Новости</LinkTitle>
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/login">
            <Icon>
              <HiMiniUserCircle />
            </Icon>
            <LinkTitle>Войти</LinkTitle>
          </StyledNavLink>
        </Li>
      </Ul>
    </Nav>
  );
};

export default Navbar;
