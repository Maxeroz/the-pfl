import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "../ui/AppLayout";
import Profile from "../pages/Profile";
import Applications from "../pages/Applications";
import Games from "../pages/Games";
import TournamentTable from "../pages/TournamentTable";
import Statistics from "../pages/Statistics";
import News from "../pages/News";
import Disqualifications from "../pages/Disqualifications";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import GlobalStyles from "../Styles/GlobalStyles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import store from "./store";

import Teams from "../pages/Teams";
import AllTeams from "../ui/AllTeams";
import Team from "../features/team/Team";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
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
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<Profile />} />
              <Route path="applications" element={<Applications />} />
              <Route path="games" element={<Games />} />
              <Route path="table" element={<TournamentTable />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="news" element={<News />} />
              <Route path="disqualifications" element={<Disqualifications />} />
              <Route path="teams" element={<Teams />}>
                {/* Лига с идентификатором */}
                <Route path="league/:leagueId" element={<AllTeams />} />
                {/* Команда с идентификатором в зависимости от лиги */}
                <Route path="league/:leagueId/team/:id" element={<Team />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
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
