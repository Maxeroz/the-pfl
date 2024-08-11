import styled from "styled-components";
import Table from "./Table";

const Number = styled.div`
  font-size: 1.6rem;
  font-weight: 600;

  color: var(--color-grey-600);
`;

const Stacked = styled.div`
  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function TeamTableRow({
  player: { number, playerName, position, games, redCards, yellowCards },
}) {
  return (
    <Table.Row>
      <Number>{number}</Number>

      <Stacked>
        <span>{playerName}</span>
      </Stacked>

      <Stacked>
        <span>{games}</span>
      </Stacked>

      <Stacked>
        <span>{redCards}</span>
      </Stacked>

      <Stacked>
        <span>{yellowCards}</span>
      </Stacked>

      <Stacked>
        <span>{position}</span>
      </Stacked>
    </Table.Row>
  );
}

export default TeamTableRow;
