import { cloneElement, createContext, useContext, useState } from "react";

// Modal Context
const ModalContext = createContext();

// Parent Component
function ModalNewTeam({ children }) {
  const [openModal, setOpenModal] = useState(true);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <ModalContext.Provider value={{ openModal, handleClose, handleOpen }}>
      {children}
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

export default ModalNewTeam;
