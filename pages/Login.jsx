import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-background);
`;

function Login() {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

export default Login;
