import { Box, LinearProgress } from "@mui/material";
import styled, { keyframes } from "styled-components";

// Стилизованный LinearProgress с использованием цвета из темы
const StyledPrimaryLinearProgress = styled(LinearProgress)`
  && {
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

function MatchSideBarLoadingIndicator() {
  return (
    <Box sx={{ width: "100%" }}>
      <StyledPrimaryLinearProgress />
    </Box>
  );
}

export default MatchSideBarLoadingIndicator;
