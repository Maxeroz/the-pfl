import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { Suspense, lazy } from "react";

import GlobalStyles from "../Styles/GlobalStyles";
import AppLayout from "../ui/AppLayout";
import ProtectedRoute from "../ui/ProtectedRoute";
import store from "./store";
import CenterSpinnerDiv from "../ui/CenterSpinnerDiv";

// Ленивые компоненты
const Profile = lazy(() => import("../pages/Profile"));
const Applications = lazy(() => import("../pages/Applications"));
const Games = lazy(() => import("../pages/Games"));
const TournamentTable = lazy(() => import("../pages/TournamentTable"));
const Statistics = lazy(() => import("../pages/Statistics"));
const News = lazy(() => import("../pages/News"));
const Disqualifications = lazy(() => import("../pages/Disqualifications"));
const Login = lazy(() => import("../pages/Login"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Teams = lazy(() => import("../pages/Teams"));
const AllTeams = lazy(() => import("../ui/AllTeams"));
const Team = lazy(() => import("../features/team/Team"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ReactQueryDevtools />
        <GlobalStyles />
        <BrowserRouter>
          {/* <Suspense fallback={<CenterSpinnerDiv />}> */}
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<Profile />} />
              <Route path="applications" element={<Applications />} />
              <Route path="games" element={<Games />} />
              <Route path="table" element={<TournamentTable />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="news" element={<News />} />
              <Route path="disqualifications" element={<Disqualifications />} />
              <Route path="teams" element={<Teams />}>
                <Route path="league/:leagueId" element={<AllTeams />} />
                <Route path="league/:leagueId/team/:id" element={<Team />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {/* </Suspense> */}
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
              iconTheme: {
                primary: "var(--color-success-500)", // Зеленый цвет иконки
              },
            },
            error: { duration: 5000 },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
