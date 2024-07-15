import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "../ui/AppLayout";
import Profile from "../pages/Profile";
import Applications from "../pages/Applications";
import Games from "../pages/Games";
import Table from "../pages/Table";
import Statistics from "../pages/Statistics";
import News from "../pages/News";
import Disqualifications from "../pages/Disqualifications";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="applications" element={<Applications />} />
            <Route path="games" element={<Games />} />
            <Route path="table" element={<Table />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="news" element={<News />} />
            <Route path="disqualifications" element={<Disqualifications />} />
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
    </div>
  );
}

export default App;
