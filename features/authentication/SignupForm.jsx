import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import TabelTitle from "../../ui/TableTitle";
import Button from "../../ui/Button";
import { signup } from "../../services/apiAuth";
import { useSignup } from "./useSignup";

// Стили для формы и полей ввода
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

// Основной компонент формы регистрации
function SignupForm() {
  const { signup, isPending } = useSignup();

  // Используем react-hook-form для управления формой
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Функция для обработки отправки формы
  function onSubmit(data) {
    signup(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TabelTitle>Регистрация</TabelTitle>

      {/* Поле для ввода полного имени */}
      <Input
        type="text"
        placeholder="Полное имя"
        {...register("fullName", { required: "Введите ваше полное имя" })}
      />
      {errors.fullName && (
        <p style={{ color: "red" }}>{errors.fullName.message}</p>
      )}

      {/* Поле для ввода email */}
      <Input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Введите ваш email",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Некорректный email адрес",
          },
        })}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

      {/* Поле для ввода пароля */}
      <Input
        type="password"
        placeholder="Пароль"
        {...register("password", {
          required: "Введите пароль",
          minLength: {
            value: 6,
            message: "Пароль должен содержать не менее 6 символов",
          },
        })}
      />
      {errors.password && (
        <p style={{ color: "red" }}>{errors.password.message}</p>
      )}

      {/* Кнопка отправки формы */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Загрузка..." : "Зарегистрироваться"}
      </Button>
    </Form>
  );
}

export default SignupForm;
