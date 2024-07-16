import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const StyledSpan = styled.span`
  color: var(--color-green-700);
`;

function Spinner({ isLoading }) {
  return (
    <div className="season-row">
      <ClipLoader size={15} color={"#15803d"} loading={isLoading} />
      <StyledSpan>Loading...</StyledSpan>
    </div>
  );
}

export default Spinner;
