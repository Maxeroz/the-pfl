import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import styled from "styled-components";
import Row from "./Row";
import Title from "../features/selectLeague/LeagueTitle";
import Footer from "./Footer";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Убедитесь, что высота минимальна на всю высоту вьюпорта */
`;

const Container = styled.div`
  flex: 1;
  width: 100%;
  max-width: 800px; /* Максимальная ширина контейнера */
  margin: 0 auto; /* Центрирование контейнера */
  padding: 0 1rem; /* Отступы слева и справа */
`;

function AppLayout() {
  return (
    <AppContainer>
      <Row>
        <Title />
        <NavBar />
      </Row>

      <Container>
        <Outlet />
      </Container>

      <Footer />
    </AppContainer>
  );
}

export default AppLayout;
