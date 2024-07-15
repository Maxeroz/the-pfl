import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Heading from "./Heading";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 800px; /* Максимальная ширина контейнера */
  margin: 0 auto; /* Центрирование контейнера */
  padding: 0 1rem; /* Отступы слева и справа */
`;

function AppLayout() {
  return (
    <>
      <Heading>Покровская футбольная лига. Сезон:</Heading>
      <NavBar />

      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default AppLayout;
