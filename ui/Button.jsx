import styled from "styled-components";

const StyledButton = styled.button`
  background-color: var(--color-primary-500);
  font-weight: 600;
  font-size: 14px;
  color: #fff;

  padding: 12px 24px;

  border-radius: var(--border-radius-lg-pfl);

  border-style: none;
`;

function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
