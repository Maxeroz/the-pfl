import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный черный фон */
  backdrop-filter: blur(5px); /* Эффект размытия */
  z-index: 1000; /* Размещение позади модального окна, но выше других элементов */
`;

const DeleteTeamContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 450px;
  height: 220px;

  background-color: var(--color-grey-0);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  z-index: 1010; /* Размещение над Overlay */
`;

function DeleteTeamForm({ children }) {
  return (
    <>
      <Overlay />
      <DeleteTeamContainer>{children}</DeleteTeamContainer>
    </>
  );
}

export default DeleteTeamForm;
