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

const Nav = styled.nav`
  border-top: 1px solid var(--color-grey-900);
  border-bottom: 1px solid var(--color-grey-900);
  padding: 0.3rem;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  margin: 0 1rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  color: var(--color-grey-800);
  text-decoration: none;
  &.active {
    font-weight: bold;
    color: var(--color-green-700);
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Ul>
        <Li>
          <StyledNavLink to="/profile">
            <HiHome />
            Профиль
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/applications">
            <HiClipboardDocumentList />
            Заявки
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/games">
            <HiOutlineSquare3Stack3D />
            Игры
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/table">
            <HiMiniTableCells />
            Таблица
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/statistics">
            <HiQueueList />
            Статистика
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/news">
            <HiOutlineNewspaper />
            Новости
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/disqualifications">
            <HiOutlineUserGroup />
            Дисквалификации
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/login">
            <HiMiniUserCircle />
            Войти
          </StyledNavLink>
        </Li>
      </Ul>
    </Nav>
  );
};

export default Navbar;
