import { Avatar, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Создаем стилизованную ссылку
const EmptyLink = styled(Link)`
  background-color: transparent; /* Прозрачный фон */
  border: none; /* Убираем рамку */
  padding: 0; /* Отсутствие внутренних отступов */
  margin: 0; /* Отсутствие внешних отступов */
  cursor: pointer; /* Меняем курсор на указатель */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* Анимация для трансформации и теней */

  :hover {
    transform: scale(1.05); /* Увеличение на 5% при наведении */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Тень при наведении */
  }

  :focus {
    outline: none; /* Убираем стандартный outline */
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* Пользовательский фокус */
  }
`;

function ImageTeams({ teams }) {
  const league = useSelector((state) => state.league.leagueTier);
  const leagueId = league.split(" ").slice(-1)[0]; // Получаем идентификатор лиги из строки

  return (
    <Stack
      width="100%"
      direction="row"
      spacing={1.5}
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Используем spacing для увеличения пространства между элементами */}
      {teams.map((team) => (
        <EmptyLink
          to={`/teams/league/${leagueId}/team/${team.id}`} // Ссылка на команду с привязкой к лиге
          key={team.id}
          aria-label={`Team ${team.name}`} // Добавляем aria-label для доступности
        >
          <Avatar
            src={team.imageUrl}
            alt={`Avatar of ${team.name}`} // alt-текст для изображения
            sx={{
              width: 40, // Ширина аватара
              height: 40, // Высота аватара
              transition: "transform 0.3s ease-in-out", // Плавное изменение размеров
              "&:hover": {
                transform: "scale(1.1)", // Дополнительный эффект при наведении
              },
            }}
          />
        </EmptyLink>
      ))}
    </Stack>
  );
}

export default ImageTeams;
