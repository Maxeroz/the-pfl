import { Outlet } from "react-router-dom";
import Row from "../ui/Row";
import TableTitle from "../ui/TableTitle";
import HeaderUserBox from "../ui/HeaderUserBox";
import User from "../ui/User";

function Teams() {
  return (
    <Row gap={3}>
      <HeaderUserBox>
        <TableTitle>Информация о командах:</TableTitle>
        <User />
      </HeaderUserBox>

      <Row>
        <Outlet />
      </Row>
    </Row>
  );
}

export default Teams;
