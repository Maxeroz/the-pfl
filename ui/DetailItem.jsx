import styled from "styled-components";
import Icon from "./Icon";

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function DetailItem({ icon, children, size, color }) {
  return (
    <StyledSpan>
      <Icon size={size} color={color}>
        {icon}
      </Icon>
      {children}
    </StyledSpan>
  );
}

export default DetailItem;
