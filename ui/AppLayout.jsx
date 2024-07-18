// import { Outlet } from "react-router-dom";
// import NavBar from "./Navbar";
// import styled, { css } from "styled-components";
// import Row from "./Row";
// import Footer from "./Footer";
// import { useProfile } from "../features/profile/useProfile";

// const AppContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh; /* Убедитесь, что высота минимальна на всю высоту вьюпорта */
// `;

// const Container = styled.div`
//   display: flex;
//   justify-content: center;

//   flex: 1;
//   width: 90%;
//   max-width: 1000px; /* Максимальная ширина контейнера */
//   min-width: 700px;
//   margin: 0 auto; /* Центрирование контейнера */
//   padding: 1rem 3rem; /* Отступы слева и справа */

//   background-color: var(--color-grey-100);

//   border-radius: var(--border-radius-sm);
//   box-shadow: var(--shadow-lg);
// `;

// function AppLayout() {
//   return (
//     <AppContainer>
//       <Row gap={1.5}>
//         <Title />
//         <NavBar />

//         <Container>
//           <Outlet />
//         </Container>

//         <Footer />
//       </Row>
//     </AppContainer>
//   );
// }

// export default AppLayout;

// Импорт необходимых библиотек и компонентов
import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import LeagueTitle from "../features/selectLeague/LeagueTitle";
import Navbar from "./Navbar";
import MainNavBarTitle from "./MainNavBarTitle";

// Создание styled-components
const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;

  width: 15%;
  background-color: #ffffff;
  padding: 20px;
`;

const MainContent = styled.div`
  width: 60%;
  background-color: #fafafa;
  padding: 20px;
  overflow-y: auto;
`;

const RightSidebar = styled.div`
  width: 25%;
  background-color: #f5f5f7;
  padding: 20px;
`;

// Определение компонента AppLayout
const AppLayout = () => {
  return (
    <Layout>
      <NavBarContainer>
        <MainNavBarTitle
          titleHeading="The PFL"
          imgUrl="/logo-pfl1.png"
        ></MainNavBarTitle>

        {/* Здесь можно разместить компоненты навигации */}
        <Navbar />
      </NavBarContainer>
      <MainContent>
        {/* Основная часть приложения */}
        <Outlet />
      </MainContent>
      <RightSidebar>
        {/* Дополнительная область */}
        <h2>Right Sidebar</h2>
      </RightSidebar>
    </Layout>
  );
};

export default AppLayout;
