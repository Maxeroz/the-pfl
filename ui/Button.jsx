import styled from "styled-components";

// Объект с темами для кнопок
const buttonThemes = {
  primary: {
    backgroundColor: "var(--color-primary-500)",
    hoverBackgroundColor: "var(--color-primary-600)",
    activeBackgroundColor: "var(--color-primary-700)",
    textColor: "#fff",
    disabledBackgroundColor: "var(--color-grey-500)",
    disabledTextColor: "var(--color-grey-300)",
  },
  error: {
    backgroundColor: "var(--color-error-500)",
    hoverBackgroundColor: "var(--color-error-600)",
    activeBackgroundColor: "var(--color-error-700)",
    textColor: "#fff",
    disabledBackgroundColor: "var(--color-grey-500)",
    disabledTextColor: "var(--color-grey-300)",
  },
};

const StyledButton = styled.button`
  background-color: ${(props) => buttonThemes[props.variant].backgroundColor};
  color: ${(props) => buttonThemes[props.variant].textColor};
  font-weight: 600;
  font-size: 14px;
  width: ${(props) => `${props.width}px` || "100%"};
  padding: 12px 24px;
  border-radius: var(--border-radius-lg-pfl);
  border-style: none;
  cursor: pointer; /* Указываем, что это кликабельный элемент */

  transition: background-color 0.3s, transform 0.2s, opacity 0.2s; /* Плавный переход для всех состояний */

  &:hover {
    background-color: ${(props) =>
      buttonThemes[props.variant]
        .hoverBackgroundColor}; /* Цвет при наведении */
  }

  &:active {
    background-color: ${(props) =>
      buttonThemes[props.variant].activeBackgroundColor}; /* Цвет при нажатии */
    transform: scale(0.98); /* Эффект уменьшения при нажатии */
  }

  &:disabled {
    background-color: ${(props) =>
      buttonThemes[props.variant]
        .disabledBackgroundColor}; /* Цвет для неактивной кнопки */
    color: ${(props) =>
      buttonThemes[props.variant]
        .disabledTextColor}; /* Цвет текста для неактивной кнопки */
    cursor: not-allowed; /* Указатель "запрещено" для неактивной кнопки */
    opacity: 0.42; /* Снижение прозрачности для эффекта "выключенной" кнопки */
  }
`;

function Button({ children, onClick, width, disabled, variant = "primary" }) {
  return (
    <StyledButton
      disabled={disabled}
      width={width}
      onClick={onClick}
      variant={variant} /* Используем проп для выбора стиля */
    >
      {children}
    </StyledButton>
  );
}

export default Button;
