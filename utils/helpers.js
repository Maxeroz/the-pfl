import { keyframes } from "styled-components";

// Анимация для переливающегося эффекта
export const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export function getLastElement(str, delimiter = " ") {
  const arr = str.split(delimiter);
  return arr.pop();
}

export function removeStringFromArray(arr, str) {
  return arr.filter((item) => item !== str);
}

export function getDifference(num1, num2) {
  return num1 - num2;
}

export function removeObjectById(array, idToRemove) {
  return array.filter((obj) => obj.id !== idToRemove);
}

export function getRandomNumberFromDate() {
  const now = Date.now();
  const random = now % 100; // Пример: взять остаток от деления на 100
  return random;
}

export function addTeamNamesToPlayers(players, tableData) {
  // Создаём мапу для быстрого поиска названия команды по id
  const teamNameMap = tableData.reduce((map, team) => {
    map[team.id] = team.teamName;
    return map;
  }, {});

  // Добавляем название команды к каждому игроку
  const updatedPlayers = players.map((player) => {
    // Ищем название команды по team_id игрока
    const teamName = teamNameMap[player.team_id] || "Неизвестная команда";

    // Возвращаем новый объект игрока с добавленным свойством teamName
    return {
      ...player,
      teamName,
    };
  });

  return updatedPlayers;
}

export function convertToEuropeanDate(isoDate) {
  // Создаём объект Date из строки формата ISO 8601
  const date = new Date(isoDate);

  // Извлекаем день и месяц
  const day = date.getDate(); // день месяца
  const month = date.getMonth() + 1; // месяцы в JavaScript начинаются с 0

  // Форматируем строку в европейский формат DD/MM
  const europeanDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}`;

  return europeanDate;
}

export function generateMonthlyData(gamesData) {
  const pointsByDate = {};
  let totalPoints = 0;

  gamesData.forEach((game) => {
    const { date, points } = game;
    totalPoints += points;
    pointsByDate[date] = totalPoints;
  });

  // Определяем диапазон для трех месяцев
  const startDate = new Date();
  startDate.setDate(1); // Начало текущего месяца
  startDate.setMonth(startDate.getMonth() - 1); // Перемещаемся на один месяц назад

  // Находим первое воскресенье, начиная с одного месяца назад
  const firstDate = new Date(startDate);
  firstDate.setDate(1); // Первый день месяца
  const firstSunday = new Date(firstDate);
  const dayOfWeek = firstSunday.getDay();
  firstSunday.setDate(
    firstSunday.getDate() - (dayOfWeek === 0 ? 0 : dayOfWeek)
  ); // Переводим к Воскресенью

  // Определяем последний день через три месяца
  const lastDate = new Date(startDate);
  lastDate.setMonth(lastDate.getMonth() + 3); // Три месяца вперед
  lastDate.setDate(0); // Последний день месяца

  const threeMonthsData = [];
  let currentPoints = 0;

  // Генерация данных для трех месяцев
  for (
    let date = firstSunday;
    date <= lastDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dateString = date.toISOString().split("T")[0];
    currentPoints =
      pointsByDate[dateString] !== undefined
        ? pointsByDate[dateString]
        : currentPoints;

    threeMonthsData.push({
      date: dateString,
      day: getDayOfWeek(dateString),
      points: currentPoints,
    });
  }

  return threeMonthsData;
}

export function getDayOfWeek(dateString) {
  const daysOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
}

export function filterWeekData(monthlyData, weekStartDate) {
  const startDate = new Date(weekStartDate);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // Переводим к понедельнику
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // Неделя длится 7 дней

  return monthlyData.filter((data) => {
    const date = new Date(data.date);
    return date >= startDate && date <= endDate;
  });
}

export function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (ref) {
        if (typeof ref === "function") {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    });
  };
}
