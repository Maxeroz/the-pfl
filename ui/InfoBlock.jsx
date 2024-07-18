import { Box, LinearProgress } from "@mui/material";
import styled, { ThemeProvider } from "styled-components";

import { HiCheckCircle } from "react-icons/hi2";
import { HiMiniXCircle } from "react-icons/hi2";

import Icon from "./Icon";
import InfoContainer from "./InfoContainer";

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: normal;
`;

const InfoSpan = styled.span`
  font-size: 12px;
`;

// Стилизованный LinearProgress с использованием цвета из темы
const StyledPrimaryLinearProgress = styled(LinearProgress)`
  && {
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

function InfoBlock({ light, text, dataString, width, height, isLoading }) {
  return (
    <InfoContainer light={light} width={width} height={height}>
      {isLoading ? (
        <Box sx={{ width: { width } }}>
          <StyledPrimaryLinearProgress />
        </Box>
      ) : (
        <>
          <Title>{text}</Title>
          <InfoSpan>{dataString}</InfoSpan>

          {dataString === true && (
            <Icon color="#9CD323" size="30px">
              <HiCheckCircle />
            </Icon>
          )}

          {dataString === false && (
            <Icon color="#FF4423" size="30px">
              <HiMiniXCircle />
            </Icon>
          )}
        </>
      )}
    </InfoContainer>
  );
}

export default InfoBlock;
