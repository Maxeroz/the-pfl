import styled from "styled-components";
import { useTable } from "../features/table/useTable";
import Loader from "../ui/Loader";
import Row from "../ui/Row";
import TableTitle from "../ui/TableTitle";

const CenterSpinnerDiv = styled.div`
  display: flex;
  margin: auto 0;
  align-items: center;
  justify-content: center;
`;

function Table() {
  const { isLoading, tableData } = useTable();

  return (
    <Row>
      <TableTitle>Таблица турнира</TableTitle>

      {isLoading ? (
        <CenterSpinnerDiv>
          <Loader isLoading={isLoading} size={50} display={false} />
        </CenterSpinnerDiv>
      ) : null}
    </Row>
  );
}

export default Table;
