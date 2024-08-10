import { cloneElement, createContext, useContext, useState } from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

// Modal Context
const ModalContext = createContext();

// Parent Component
function ModalNewTeam({ children }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const ref = useEscapeKey(handleClose);

  return (
    <ModalContext.Provider value={{ openModal, handleClose, handleOpen }}>
      <div ref={ref}>{children}</div>
    </ModalContext.Provider>
  );
}

function ModalOpenButton({ children }) {
  const { handleOpen } = useContext(ModalContext);

  return cloneElement(children, { onClick: handleOpen });
}

function ModalWindow({ children }) {
  const { handleClose, openModal } = useContext(ModalContext);

  return cloneElement(children, {
    onClose: handleClose,
    open: openModal,
  });
}

ModalNewTeam.ModalOpenButton = ModalOpenButton;
ModalNewTeam.ModalWindow = ModalWindow;

export function useModalNewTeamContext() {
  const context = useContext(ModalContext);

  if (context === undefined)
    throw new Error(
      "ModalNewTeamContext was used outside ModalContextProvider"
    );
  return context;
}

export default ModalNewTeam;
