import { BeatLoader } from "react-spinners";
import styled from "styled-components";

const StyledSpan = styled.span`
  color: var(--color-green-700);
`;

function Loader({ isLoading, size, display }) {
  return (
    <div>
      <BeatLoader size={size} color={"#15803d"} loading={isLoading} />
      {display && <StyledSpan>Loading...</StyledSpan>}
    </div>
  );
}

export default Loader;
