import React, {
  cloneElement,
  createContext,
  useState,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import useEscapeKey from "../hooks/useEscapeKey";

// Создаем контекст для модального окна
const ReusableModalContext = createContext();

// Основной компонент для управления модальными окнами
function ReusableModalWindow({ children }) {
  const [open, setOpen] = useState("");

  const handleOpen = (id) => setOpen(id); // Функция для открытия модального окна
  const handleClose = () => setOpen(""); // Функция для закрытия модального окна

  const refEscapeKey = useEscapeKey(handleClose);

  return (
    <ReusableModalContext.Provider value={{ open, handleOpen, handleClose }}>
      <div ref={refEscapeKey}>{children}</div>
    </ReusableModalContext.Provider>
  );
}

// Компонент кнопки, который передает функцию handleOpen через onClick
function ToggleButton({ children, id }) {
  const { handleOpen } = useContext(ReusableModalContext); // Достаем handleOpen из контекста

  // Проверка на то, что children является допустимым React элементом
  if (!React.isValidElement(children)) return null;

  // Клонируем дочерний элемент и добавляем ему onClick
  return cloneElement(children, {
    onClick: () => handleOpen(id),
  });
}

function CloseModal({ children }) {
  const { handleClose } = useContext(ReusableModalContext);

  return cloneElement(children, {
    onClick: () => handleClose(),
  });
}

function Window({ children, id }) {
  const { open, handleClose } = useContext(ReusableModalContext); // Достаем handleClose и open из контекста

  // Если текущее окно не открыто, возвращаем null
  if (open !== id) return null;

  // Проверка на то, что children является допустимым React элементом
  if (!React.isValidElement(children)) return null;

  // Используем ReactDOM.createPortal для рендеринга children в body
  return createPortal(
    React.cloneElement(children, { handleClose: handleClose }), // Добавляем обработчик клика
    document.body
  );
}

// Добавляем компоненты как свойства к ReusableModalWindow
ReusableModalWindow.ToggleButton = ToggleButton;
ReusableModalWindow.Window = Window;
ReusableModalWindow.CloseModal = CloseModal;

export default ReusableModalWindow;
