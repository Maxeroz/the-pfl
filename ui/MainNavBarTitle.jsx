import styled from "styled-components";

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column-reverse;
`;

const NavBarTitle = styled.h1`
  text-align: center;
  font-weight: 600;
  line-height: 48px; /* Проверьте соответствие с размером шрифта */
`;

const StyledImg = styled.img`
  width: ${(props) =>
    props.width}px; /* Убедитесь, что width передается как число */
  border-radius: var(--border-radius-md);
`;

function MainNavBarTitle({ titleHeading, imgUrl, width }) {
  return (
    <NavBarContainer>
      <StyledImg src={imgUrl} width={width} alt="NavBar Image" />
      <NavBarTitle>{titleHeading}</NavBarTitle>
    </NavBarContainer>
  );
}

export default MainNavBarTitle;
