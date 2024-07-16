import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import styled from "styled-components";
import Row from "./Row";
import Title from "../features/selectLeague/LeagueTitle";

const Container = styled.div`
  width: 100%;
  max-width: 800px; /* Максимальная ширина контейнера */
  margin: 0 auto; /* Центрирование контейнера */
  padding: 0 1rem; /* Отступы слева и справа */
`;

function AppLayout() {
  return (
    <>
      <Row>
        <Title />
        <NavBar />
      </Row>

      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default AppLayout;
