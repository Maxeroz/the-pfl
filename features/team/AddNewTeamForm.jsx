import styled from "styled-components";
import TableTitle from "../../ui/TableTitle";
import { useSelector } from "react-redux";
import Row from "../../ui/Row";
import { useForm } from "react-hook-form"; // Импортируем useForm
import Button from "../../ui/Button";
import { useState } from "react"; // Импортируем useState для управления состоянием

const StyledTeamName = styled.span`
  border-bottom: 2px solid var(--color-primary-500);
`;

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column; /* Столбчатая компоновка для лучшей структуры */
  justify-content: space-between;
  background-color: var(--color-grey-0);
  width: 680px;
  /* height: 400px; */
  border: 1px solid var(--color-primary-100);
  border-radius: var(--border-radius-lg-pfl);
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FormInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormInput = styled.input`
  border: 1px solid var(--color-primary-100);
  border-radius: var(--border-radius-lg-pfl);
  height: 50px;
  width: 400px;
  padding: 5px 20px;
  font-size: 12px;
  font-weight: 500;

  /* Изменяем цвет границы при ошибке */
  ${({ hasError }) =>
    hasError &&
    `
      border-color: var(--color-error);
    `}
`;

const FileInput = styled.input`
  border: 1px solid var(--color-primary-100);
  border-radius: var(--border-radius-lg-pfl);
  height: 50px;
  width: 400px;
  padding: 5px 20px;
  font-size: 12px;
  font-weight: 500;
`;

const InputLabel = styled.label`
  font-size: 1.4rem;
  margin-bottom: 8px;
  color: var(--color-grey-700);
  font-size: 14px;
  font-weight: 600;
`;

const ImagePreview = styled.img`
  width: 100px; /* Ширина предварительного просмотра */
  height: 100px; /* Высота предварительного просмотра */
  object-fit: cover;
  border-radius: var(--border-radius-lg-pfl);
  margin-top: 10px; /* Отступ сверху */
  border: 1px solid var(--color-primary-100);
`;

// Стиль для отображения сообщений об ошибках
const ErrorMessage = styled.span`
  color: var(--color-error-500); // Определите ваш цвет ошибки в CSS-переменных
  font-size: 12px;
  /* margin-top: 4px; */
`;

function AddNewTeamForm() {
  const leagueTier = useSelector((state) => state.league.leagueTier);

  // Инициализация useForm с значениями по умолчанию
  const {
    register,
    handleSubmit,
    formState: { errors }, // Получаем объект ошибок
    setValue, // Используем для установки значения
  } = useForm({
    defaultValues: {
      teamName: "", // Значение по умолчанию для имени команды
      teamLogo: null, // Значение по умолчанию для логотипа команды
    },
  });

  const [imagePreview, setImagePreview] = useState(null); // Состояние для предварительного просмотра изображения

  const onSubmit = (data) => {
    console.log(data); // Логирование отправленных данных формы
    // Обработка отправки формы
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Получаем первый выбранный файл
    if (file) {
      // Если файл выбран
      setValue("teamLogo", file); // Устанавливаем значение для формы
      const reader = new FileReader(); // Создаем объект FileReader
      reader.onloadend = () => {
        // Когда чтение файла завершено
        setImagePreview(reader.result); // Устанавливаем изображение для предварительного просмотра
      };
      reader.readAsDataURL(file); // Читаем файл как Data URL
    }
  };

  return (
    <StyledFormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        {/* Обертка элементов в form */}
        <Row gap={2}>
          <TableTitle>
            Добавить команду в турнир:{" "}
            <StyledTeamName>{leagueTier}</StyledTeamName>
          </TableTitle>
          <Row gap={1}>
            <InputLabel htmlFor="teamName">Название команды</InputLabel>
            <FormInputContainer>
              <FormInput
                placeholder="Название команды..."
                id="teamName"
                {...register("teamName", {
                  required: "Название команды обязательно",
                })}
                hasError={!!errors.teamName} // Передаем пропс для отображения ошибки
              />
              {/* Отображаем сообщение об ошибке, если оно есть */}
              {errors.teamName && (
                <ErrorMessage>{errors.teamName.message}</ErrorMessage>
              )}
            </FormInputContainer>
          </Row>

          <Row gap={1}>
            <InputLabel htmlFor="teamLogo">Логотип команды</InputLabel>
            <FormInputContainer>
              <FileInput
                type="file"
                id="teamLogo"
                accept="image/*" // Ограничиваем только изображениями
                {...register("teamLogo")}
                onChange={handleFileChange} // Обработчик изменения файла
              />
              {/* Отображаем предварительный просмотр изображения, если он есть */}
              {imagePreview && (
                <ImagePreview src={imagePreview} alt="Team Logo Preview" />
              )}
            </FormInputContainer>
          </Row>

          <Button width={200} type="submit">
            {" "}
            {/* Кнопка отправки, onClick не требуется */}
            Применить
          </Button>
        </Row>
      </form>
    </StyledFormContainer>
  );
}

export default AddNewTeamForm;
