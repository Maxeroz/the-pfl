import styled from "styled-components";
import Heading from "./Heading";

const StyledTitleDiv = styled.div`
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  height: 5.5rem;
  width: auto;
  border-radius: 1rem;
`;

function Title() {
  return (
    <StyledTitleDiv>
      <Img src="/logo-pfl.png" alt="Logo" />
      <Heading>Покровская футбольная лига. Сезон: X</Heading>
    </StyledTitleDiv>
  );
}

export default Title;
