import { Style } from "@mui/icons-material";
import styled from "styled-components";

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
const NavBarTitle = styled.h1`
  font-weight: 600;
  line-height: 48px;
`;

const StyledImg = styled.img`
  width: 40px;

  border-radius: var(--border-radius-md);
`;

function MainNavBarTitle({ titleHeading, imgUrl }) {
  return (
    <NavBarContainer>
      <StyledImg src={imgUrl} />
      <NavBarTitle>{titleHeading}</NavBarTitle>
    </NavBarContainer>
  );
}

export default MainNavBarTitle;
