// src/pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import supabase from "../services/supabase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: var(--color-primary-500);
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-700);
  }

  &:disabled {
    background-color: var(--color-grey-300);
    cursor: not-allowed;
  }
`;

const ToggleLink = styled.p`
  margin-top: 1rem;
  color: var(--color-primary-500);
  cursor: pointer;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isSignUp) {
      // Регистрация пользователя
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        alert(
          "Регистрация прошла успешно! Проверьте вашу почту для подтверждения."
        );
        setIsSignUp(false);
      }
    } else {
      // Вход пользователя
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        navigate("/profile");
      }
    }

    setLoading(false);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
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
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
        </Button>
        <ToggleLink onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </ToggleLink>
      </Form>
    </Container>
  );
}

export default Login;
