import styled, { keyframes } from "styled-components";

// Animation for fadeIn effect
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled component for InfoContainer
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => props.alignItems || "center"};
  flex-direction: ${(props) => props.direction || "row"};
  gap: 10px;

  cursor: ${(props) => props.onClick && "pointer"};

  overflow: ${(props) => (props.scroll ? "scroll" : "hidden")};
  overflow-x: ${(props) =>
    props.scrollX
      ? props.scrollX
      : "hidden"}; /* Separate control for horizontal scrolling */
  overflow-y: ${(props) =>
    props.scrollY
      ? props.scrollY
      : "hidden"}; /* Separate control for vertical scrolling */

  background-color: ${(props) =>
    props.light === "light"
      ? "var(--input-border-color)"
      : "var(--color-secondary-500)"};
  border-radius: var(--border-radius-lg-pfl);
  padding: 20px;
  color: ${(props) =>
    props.light === "light"
      ? "var(--color-secondary-500)"
      : "var(--color-grey-0)"};
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "auto"};

  animation: ${fadeIn} 0.1s ease-in-out;
`;

InfoContainer.defaultProps = {
  scroll: false, // Default scroll is false, meaning hidden overflow
  scrollX: false, // Default horizontal scroll is false
  scrollY: false, // Default vertical scroll is false
};

export default InfoContainer;
