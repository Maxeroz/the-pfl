import { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SwitchLink = styled.a`
  margin-top: 1rem;
  color: var(--color-primary-600);
  cursor: pointer;
  text-decoration: underline;
`;

function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <Container>
      {isLogin ? (
        <>
          <LoginForm />
          <SwitchLink onClick={toggleForm}>
            Нет аккаунта? Зарегистрироваться
          </SwitchLink>
        </>
      ) : (
        <>
          <SignupForm />
          <SwitchLink onClick={toggleForm}>Уже есть аккаунт? Войти</SwitchLink>
        </>
      )}
    </Container>
  );
}

export default AuthContainer;
