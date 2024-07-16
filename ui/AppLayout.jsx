import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import styled, { css } from "styled-components";
import Row from "./Row";
import Title from "../features/selectLeague/LeagueTitle";
import Footer from "./Footer";
import { useProfile } from "../features/profile/useProfile";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Убедитесь, что высота минимальна на всю высоту вьюпорта */
`;

const Container = styled.div`
  display: flex;
  justify-content: center;

  /* ${(props) =>
    props.align === true &&
    css`
      align-items: center;
    `} */

  flex: 1;
  width: 90%;
  max-width: 800px; /* Максимальная ширина контейнера */
  margin: 0 auto; /* Центрирование контейнера */
  padding: 1rem 3rem; /* Отступы слева и справа */

  background-color: var(--color-grey-100);

  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-lg);
`;

function AppLayout() {
  const { isLoading } = useProfile();

  return (
    <AppContainer>
      <Row gap={1.5}>
        <Title />
        <NavBar />

        <Container>
          <Outlet />
        </Container>

        <Footer />
      </Row>
    </AppContainer>
  );
}

export default AppLayout;
