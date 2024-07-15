import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <nav></nav>
      <Outlet />
    </>
  );
}

export default AppLayout;
