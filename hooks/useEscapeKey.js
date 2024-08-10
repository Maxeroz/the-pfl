import { useEffect, useRef } from "react";

// Кастомный хук для обработки нажатия клавиши ESC
function useEscapeKey(handler) {
  const ref = useRef(null);

  useEffect(() => {
    // Обработчик события нажатия клавиши
    const handleKeyDown = (event) => {
      // Проверяем, является ли нажатая клавиша Escape
      if (event.key === "Escape") {
        handler(); // Вызываем переданный обработчик
      }
    };

    // Добавляем обработчик события
    document.addEventListener("keydown", handleKeyDown);

    // Убираем обработчик события при размонтировании компонента
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handler]);

  return ref;
}

export default useEscapeKey;
