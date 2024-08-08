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
  player: { number, playerName, position, age, height, weight },
}) {
  return (
    <Table.Row>
      <Number>{number}</Number>

      <Stacked>
        <span>{playerName}</span>
      </Stacked>

      <Stacked>
        <span>{age}</span>
      </Stacked>

      <Stacked>
        <span>{height}</span>
      </Stacked>

      <Stacked>
        <span>{weight}</span>
      </Stacked>

      <Stacked>
        <span>{position}</span>
      </Stacked>
    </Table.Row>
  );
}

export default TeamTableRow;
