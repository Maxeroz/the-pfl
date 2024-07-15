import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

function AppLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default AppLayout;
