import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import TableTitle from "../../ui/TableTitle";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useAddTeam } from "./useAddTeam";
import CenterSpinnerDiv from "../../ui/CenterSpinnerDiv";

const StyledTeamName = styled.span`
  border-bottom: 2px solid var(--color-primary-500);
`;

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  width: 680px;
  height: 380px;
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
  border: 1px solid
    ${(props) =>
      props.hasError ? "var(--color-error-500)" : "var(--color-primary-100)"};
  border-radius: var(--border-radius-lg-pfl);
  height: 50px;
  width: 400px;
  padding: 5px 20px;
  font-size: 12px;
  font-weight: 500;

  /* Стили для фокуса */
  &:focus {
    outline: none; /* Убираем стандартное выделение */
    border-color: ${(props) =>
      props.hasError ? "var(--color-error-500)" : "var(--color-primary-500)"};
  }
`;

const DropzoneWrapper = styled.div`
  border: 2px dashed
    ${(props) =>
      props.hasError
        ? "var(--color-error-500)"
        : props.isUploaded
        ? "var(--color-success-500)"
        : "var(--color-primary-100)"};

  border-radius: var(--border-radius-lg-pfl);
  height: 50px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-0);
  cursor: pointer;
  position: relative;
`;

const DropzoneText = styled.span`
  font-size: 14px;
  color: ${(props) =>
    props.hasError ? "var(--color-error-500)" : "var(--color-success-500)"};
`;

const InputLabel = styled.label`
  font-size: 1.4rem;
  margin-bottom: 8px;
  color: var(--color-grey-700);
  font-size: 14px;
  font-weight: 600;
`;

const ErrorMessage = styled.span`
  color: var(--color-error-500);
  font-size: 12px;
`;

const SuccessMessage = styled.span`
  color: var(--color-success-500);
  font-size: 12px;
`;

function AddNewTeamForm() {
  // Получаем доступ к ID лиги из Redux
  const leagueTier = useSelector((state) => state.league.leagueTier);
  const leagueId = leagueTier.split(" ").slice(-1)[0];

  const { addNewTeam, isPending: isAddingTeam } = useAddTeam();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      teamName: "",
      teamLogo: null,
    },
    mode: "onBlur",
  });

  // Состояние загрузки изображения
  const [logoUploaded, setLogoUploaded] = useState(false);

  const onSubmit = (data) => {
    // Проверяем наличие ошибки перед отправкой
    if (!data.teamLogo || data.teamLogo.length === 0) {
      setError("teamLogo", {
        type: "manual",
        message: "Логотип команды обязателен",
      });
      setLogoUploaded(false);
      return; // Прекращаем обработку формы, если логотип не загружен
    }

    // Обработка отправки формы
    const teamName = data.teamName;
    const teamLogoFile = data.teamLogo; // Берем первый файл из массива файлов
    const tableName = `league${leagueId}_table`;

    addNewTeam({ tableName, teamName, teamLogoFile }); // Передаем правильные параметры
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue("teamLogo", file); // Устанавливаем загруженный файл
      setLogoUploaded(true); // Устанавливаем положительную индикацию
      clearErrors("teamLogo"); // Очистить ошибку, если есть
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Разрешить только изображения
    multiple: false, // Разрешить загрузку только одного файла
  });

  return (
    <StyledFormContainer>
      {isAddingTeam ? (
        <CenterSpinnerDiv />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gap={2}>
            <TableTitle>
              Добавить команду в турнир:{" "}
              <StyledTeamName>{leagueTier}</StyledTeamName>
            </TableTitle>
            <Row gap={1}>
              <InputLabel htmlFor="teamName">Название команды</InputLabel>
              <FormInputContainer>
                <FormInput
                  placeholder="Введите название команды..."
                  id="teamName"
                  {...register("teamName", {
                    required: "Название команды обязательно",
                  })}
                  hasError={!!errors.teamName}
                />
                {errors.teamName && (
                  <ErrorMessage>{errors.teamName.message}</ErrorMessage>
                )}
              </FormInputContainer>
            </Row>

            <Row gap={1}>
              <InputLabel htmlFor="teamLogo">Логотип команды</InputLabel>
              <FormInputContainer>
                <DropzoneWrapper
                  {...getRootProps()}
                  hasError={!!errors.teamLogo} // Показываем ошибку, если она есть
                  isUploaded={logoUploaded}
                >
                  <input {...getInputProps()} />
                  <DropzoneText hasError={!!errors.teamLogo}>
                    {logoUploaded
                      ? "Изображение загружено"
                      : "Перетащите изображение сюда или нажмите для выбора"}
                  </DropzoneText>
                </DropzoneWrapper>
                {errors.teamLogo && (
                  <ErrorMessage>{errors.teamLogo.message}</ErrorMessage>
                )}
                {logoUploaded && !errors.teamLogo && (
                  <SuccessMessage>Логотип загружен успешно!</SuccessMessage>
                )}
              </FormInputContainer>
            </Row>

            <Button width={200} type="submit" disabled={isAddingTeam}>
              Применить
            </Button>
          </Row>
        </form>
      )}
    </StyledFormContainer>
  );
}

export default AddNewTeamForm;
