import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const SpinnerDiv = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

function CenterMiniSpinnerDiv() {
  return (
    <SpinnerDiv>
      <CircularProgress size={15} color="secondary" />
    </SpinnerDiv>
  );
}

export default CenterMiniSpinnerDiv;
