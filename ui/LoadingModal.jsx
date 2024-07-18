import { Backdrop, CircularProgress } from "@mui/material";

const LoadingModal = ({ isUpdating }) => {
  return (
    <Backdrop
      open={isUpdating}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingModal;
