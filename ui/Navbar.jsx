import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: var(--color-silver-700);
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
  color: white;
  text-decoration: none;
  &.active {
    font-weight: bold;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Ul>
        <Li>
          <StyledNavLink to="/profile">Profile</StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/applications">Applications</StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/games">Games</StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/table">Table</StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/statistics">Statistics</StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/news">News</StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/disqualifications">
            Disqualifications
          </StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/login">Login</StyledNavLink>
        </Li>
      </Ul>
    </Nav>
  );
};

export default Navbar;
