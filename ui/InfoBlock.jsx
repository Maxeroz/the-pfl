import { Box, LinearProgress } from "@mui/material";
import styled from "styled-components";

import { HiCheckCircle } from "react-icons/hi2";
import { HiMiniXCircle } from "react-icons/hi2";

import Icon from "./Icon";
import InfoContainer from "./InfoContainer";
import { Link } from "react-router-dom";

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: normal;
`;

const InfoSpan = styled.span`
  font-size: 12px;
`;

// Создаем стилизованную кнопку
const EmptyLink = styled(Link)`
  background-color: transparent; /* Прозрачный фон */
  border: none; /* Убираем рамку */
  padding: 0; /* Отсутствие внутренних отступов */
  margin: 0; /* Отсутствие внешних отступов */
  cursor: pointer; /* Меняем курсор на указатель */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Добавляем анимацию для трансформации и теней */

  :focus {
    outline: none; /* Убираем стандартный outline */
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* Пользовательский фокус */
  }
`;

// Стилизованный LinearProgress с использованием цвета из темы
const StyledPrimaryLinearProgress = styled(LinearProgress)`
  && {
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

function InfoBlock({
  light,
  text,
  dataString,
  width,
  height,
  isLoading,
  children,
  action,
  to,
  scrollX,
  onClick,
}) {
  if (children)
    return (
      <InfoContainer
        light={light}
        width={width}
        height={height}
        action={action}
        scrollX={scrollX}
      >
        {isLoading ? (
          <Box sx={{ width: { width } }}>
            <StyledPrimaryLinearProgress />
          </Box>
        ) : (
          children
        )}
      </InfoContainer>
    );

  return action ? (
    <EmptyLink to={to}>
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
              <Icon color="success" size="30px">
                <HiCheckCircle />
              </Icon>
            )}

            {dataString === false && (
              <Icon color="error" size="30px">
                <HiMiniXCircle />
              </Icon>
            )}
          </>
        )}
      </InfoContainer>
    </EmptyLink>
  ) : (
    <InfoContainer
      light={light}
      width={width}
      height={height}
      onClick={onClick}
    >
      {isLoading ? (
        <Box sx={{ width: { width } }}>
          <StyledPrimaryLinearProgress />
        </Box>
      ) : (
        <>
          <Title>{text}</Title>
          <InfoSpan>{dataString}</InfoSpan>

          {dataString === true && (
            <Icon color="success" size="30px">
              <HiCheckCircle />
            </Icon>
          )}

          {dataString === false && (
            <Icon color="error" size="30px">
              <HiMiniXCircle />
            </Icon>
          )}
        </>
      )}
    </InfoContainer>
  );
}

export default InfoBlock;
