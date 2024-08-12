import styled from "styled-components";
import Button from "./Button";
import ReusableModalWindow from "./ReusableModalWindow";
import { HiMiniXMark } from "react-icons/hi2";

// Контейнер для модального окна
const ConfirmActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Для позиционирования крестика */
  padding: 20px;
  gap: 25px;
  font-size: 24px;
  font-weight: 600;
`;

// Стиль для кнопки с крестиком
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;

  &:hover {
    color: var(--color-grey-700); /* Добавляем эффект при наведении */
  }
`;

function ConfirmAction({ children, action, variant, handler }) {
  return (
    <ConfirmActionContainer>
      {/* Крестик для закрытия окна */}
      <ReusableModalWindow.CloseModal>
        <CloseButton>
          <HiMiniXMark />
        </CloseButton>
      </ReusableModalWindow.CloseModal>

      <div>
        {children} {action.value} {action.target}?
      </div>

      <Button variant={variant} onClick={handler}>
        {action.value}
      </Button>
    </ConfirmActionContainer>
  );
}

export default ConfirmAction;
