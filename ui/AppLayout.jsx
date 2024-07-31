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

// Создание собственной темы с переопределением цвета primary для LinearProgress
const theme = createTheme({
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  palette: {
    primary: { main: "#141522" },
    secondary: { main: "#8E92BC" },
  },
});

// Импорт необходимых библиотек и компонентов
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import MainNavBarTitle from "./MainNavBarTitle";
import { createTheme } from "@mui/material";
import NavBarContainer from "./NavBarContainer";
import MainContent from "./MainContent";

import Sidebar from "./Sidebar";
import {
  HiClipboardDocumentList,
  HiHome,
  HiMiniTableCells,
  HiMiniUserCircle,
  HiOutlineNewspaper,
  HiOutlineSquare3Stack3D,
  HiQueueList,
} from "react-icons/hi2";

// Создание styled-components
const Layout = styled.div`
  display: flex;
  height: 100vh;
`;

// Определение компонента AppLayout
const AppLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <NavBarContainer>
          <MainNavBarTitle
            titleHeading="The PFL"
            imgUrl="/logo-pfl1.png"
            width="50"
          ></MainNavBarTitle>

          <Navbar
            options={[
              { to: "/profile", icon: <HiHome />, title: "Профиль" },
              {
                to: "/applications",
                icon: <HiClipboardDocumentList />,
                title: "Заявки",
              },
              {
                to: "/games",
                icon: <HiOutlineSquare3Stack3D />,
                title: "Игры",
              },
              { to: "/table", icon: <HiMiniTableCells />, title: "Таблица" },
              {
                to: "/statistics",
                icon: <HiQueueList />,
                title: "Статистика",
              },
              { to: "/news", icon: <HiOutlineNewspaper />, title: "Новости" },
              { to: "/login", icon: <HiMiniUserCircle />, title: "Войти" },
            ]}
          />
        </NavBarContainer>
        <MainContent>
          {/* Основная часть приложения */}
          <Outlet />
        </MainContent>
        <Sidebar>{/* Дополнительная область */}</Sidebar>
      </Layout>
    </ThemeProvider>
  );
};

export default AppLayout;
