import ReusableResultsTable from "../ui/ReusableResultsTable";
import Row from "../ui/Row";
import TableTitle from "../ui/TableTitle";

const players = [
  {
    id: 1,
    playerName: "Удалов Никита",
    number: 10,
    games: 17,
    scored: 9,
    assists: 12,
    scored_assists: 21,
    teamName: "Покровск",
  },
];

const titpleOptions = ["Лучшие бомбардиры", "Лучшие ассистенты"];

// Функция render
function render(player) {
  const order = [
    "number",
    "playerName",
    "teamName",
    "scored",
    "assists",
    "scored_assists",
    "games",
  ];

  return order.map((key) => (
    <ReusableResultsTable.StyledTableCell key={key}>
      {player[key]}
    </ReusableResultsTable.StyledTableCell>
  ));
}

function Statistics() {
  return (
    <Row gap={3}>
      <Row>
        <TableTitle>Статистика</TableTitle>
      </Row>
      <Row type="horizontal" gap={3}>
        <ReusableResultsTable
          titleOptions={titpleOptions}
          initialTitle="Лучшие бомбардиры"
          players={players}
          render={render}
        >
          <ReusableResultsTable.TableHead>
            <ReusableResultsTable.TableRow>
              <ReusableResultsTable.StyledTableCell>
                №
              </ReusableResultsTable.StyledTableCell>
              <ReusableResultsTable.StyledTableCell>
                Имя
              </ReusableResultsTable.StyledTableCell>
              <ReusableResultsTable.StyledTableCell>
                Команда
              </ReusableResultsTable.StyledTableCell>
              <ReusableResultsTable.StyledTableCell>
                Г
              </ReusableResultsTable.StyledTableCell>
              <ReusableResultsTable.StyledTableCell>
                П
              </ReusableResultsTable.StyledTableCell>
              <ReusableResultsTable.StyledTableCell>
                Г+П
              </ReusableResultsTable.StyledTableCell>
              <ReusableResultsTable.StyledTableCell>
                Игры
              </ReusableResultsTable.StyledTableCell>
            </ReusableResultsTable.TableRow>
          </ReusableResultsTable.TableHead>
        </ReusableResultsTable>
        {/* <ReusableResultsTable title="Список Ассистентов" /> */}
      </Row>
    </Row>
  );
}

export default Statistics;
