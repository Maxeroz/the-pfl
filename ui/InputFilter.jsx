import { useState } from "react";
import styled from "styled-components";
import { RiFindReplaceLine } from "react-icons/ri";

// Контейнер для инпута и иконки
const InputWrapper = styled.div`
  position: relative;
  width: 70%;
`;

// Инпут с увеличенным внутренним отступом слева
const StyledInput = styled.input`
  width: 100%;
  padding: 14px 28px 14px 28px; /* Увеличьте внутренний отступ слева для иконки */
  font-size: 12px;
  color: var(--color-secondary-400);
  border-style: none;
  border: 1px solid var(--input-border-color);
  border-radius: var(--border-radius-lg-pfl);

  &:focus {
    outline: none; /* Убираем стандартное выделение */
    border-color: var(--color-primary-500); /* Цвет границы при фокусе */
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2); /* Добавляем тень для выделения */
  }
`;

// Стили для иконки поиска
const SearchIcon = styled(RiFindReplaceLine)`
  position: absolute;
  right: 28px; /* Позиция иконки справа */
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-secondary-400);
  font-size: 16px; /* Размер иконки, при необходимости отрегулируйте */
  width: 20px;
  height: 20px;
`;

const StyledLabel = styled.label``;

function InputFilterTeam({ value, handleChange }) {
  return (
    <InputWrapper>
      <StyledInput
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Найдите команду..."
      />
      <SearchIcon /> {/* Вставка иконки */}
    </InputWrapper>
  );
}

export default InputFilterTeam;
