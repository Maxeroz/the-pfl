import { useState } from "react";

import styled from "styled-components";

import { useLogin } from "./useLogin";
import TabelTitle from "../../ui/TableTitle";
import Button from "../../ui/Button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: #fff;
  gap: 16px;
  padding: 2rem;

  border: 1px solid var(--color-secondary-100);
  border-radius: var(--border-radius-lg-pfl);
`;

const Input = styled.input`
  padding: 16px 20px;
  border: 1px solid var(--color-primary-100);
  border-radius: var(--border-radius-lg-pfl);
  font-size: 14px;
`;

function LoginForm() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("qwerty911");
  const [error] = useState("");

  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TabelTitle>Войдите</TabelTitle>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Загрузка..." : "Войти"}
      </Button>
    </Form>
  );
}

export default LoginForm;
