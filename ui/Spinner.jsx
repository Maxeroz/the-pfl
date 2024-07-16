import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const StyledSpan = styled.span`
  color: var(--color-green-700);
`;

function Spinner({ isLoading, size, display }) {
  return (
    <div>
      <ClipLoader
        size={size}
        color={"#15803d"}
        loading={isLoading}
        speedMultiplier="1"
      />
      {display && <StyledSpan>Loading...</StyledSpan>}
    </div>
  );
}

export default Spinner;
