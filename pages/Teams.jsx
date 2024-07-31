import { Outlet } from "react-router-dom";
import Row from "../ui/Row";
import TableTitle from "../ui/TableTitle";

function Teams() {
  return (
    <Row gap={3}>
      <Row>
        <TableTitle>Данные о командах:</TableTitle>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Row>
  );
}

export default Teams;
