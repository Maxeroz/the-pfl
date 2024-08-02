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
