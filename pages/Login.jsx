import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CenterSpinnerDiv from "../ui/CenterSpinnerDiv";
import AuthContainer from "../features/authentication/AuthContainer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-background);
`;

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  // Отобразить спиннер если загружаются данные
  if (isLoading) return <CenterSpinnerDiv />;

  // Если пользователь не аутентифицирован, показываем форму входа
  return (
    <AuthContainer>{isAuthenticated ? null : <LoginForm />}</AuthContainer>
  );
}

export default Login;
