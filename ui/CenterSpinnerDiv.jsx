import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const SpinnerDiv = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100%;
`;

function CenterSpinnerDiv() {
  return (
    <SpinnerDiv>
      <CircularProgress />
    </SpinnerDiv>
  );
}

export default CenterSpinnerDiv;
