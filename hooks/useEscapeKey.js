import { useEffect, useRef } from "react";

// Кастомный хук для обработки нажатия клавиши ESC
function useEscapeKey(handler) {
  const ref = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        // Проверяем, находится ли фокус внутри элемента с ref
        if (ref.current && ref.current.contains(document.activeElement)) {
          handler();
        }
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
