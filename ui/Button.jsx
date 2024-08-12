import styled, { css } from "styled-components";

// Объект с темами для кнопок
const buttonThemes = {
  primary: css`
    background-color: var(--color-primary-500);
    color: #fff;

    border-style: none;

    &:hover {
      background-color: var(--color-primary-600);
    }

    &:active {
      background-color: var(--color-primary-700);
    }

    &:focus {
      outline: none; /* Убираем стандартную обводку */
    }

    &:disabled {
      background-color: var(--color-grey-500);
      color: var(--color-grey-300);
    }
  `,
  secondary: css`
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-secondary-200);

    color: var(--color-secondary-400);

    &:hover {
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-secondary-500);

      color: var(--color-secondary-500);
    }

    &:active {
      background-color: var(--color-secondary-100);
      border-color: var(--color-secondary-200);

      outline: none;
    }

    &:focus {
      border: 1px solid var(--color-secondary-100);
      outline: none;
    }

    &:disabled {
      background-color: var(--color-grey-500);
      color: var(--color-grey-300);
    }
  `,
};

const StyledButton = styled.button`
  ${(props) =>
    buttonThemes[
      props.variant || "primary"
    ]}; /* Применяем тему на основе пропса variant */

  font-weight: 600;
  font-size: 14px;
  width: ${(props) => `${props.width}px` || "100%"};
  padding: 12px 24px;
  border-radius: var(--border-radius-lg-pfl);

  outline: none;

  cursor: pointer;

  text-transform: capitalize;
  transition: background-color 0.3s, transform 0.2s, opacity 0.2s;

  &:active {
    transform: scale(0.98); /* Эффект уменьшения при нажатии */
  }

  &:disabled {
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
