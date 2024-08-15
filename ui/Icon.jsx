import styled from "styled-components";

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.size || "30px"};
  color: ${(props) =>
    props.color ? `var(--color-${props.color}-500)` : "inherit"};
`;

const Icon = ({ size, color, children }) => {
  return (
    <IconWrapper size={size} color={color}>
      {children}
    </IconWrapper>
  );
};

export default Icon;
