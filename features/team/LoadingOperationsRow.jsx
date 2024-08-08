import styled from "styled-components";
import { shimmer } from "../../utils/helpers";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  border-radius: 5px;
  padding: 0 20px;

  background-color: var(--color-grey-0);
`;

const PlaceholderText = styled.div`
  width: 320px;
  height: 28px;

  /* Стиль для переливающегося фона */
  background: linear-gradient(
    90deg,
    var(--color-secondary-200) 25%,
    var(--color-secondary-300) 50%,
    var(--color-secondary-400) 75%
  );
  /* background-size: 200% 100%; */

  /* Анимация */
  animation: ${shimmer} 1s infinite linear;

  /* background-color: var(--color-secondary-200); */
  border-radius: var(--border-radius-lg-pfl);
`;

const LoadingButton = styled.div`
  width: 88px;
  height: 44px;

  background-color: var(--color-secondary-200);
  border-radius: var(--border-radius-lg-pfl);
`;

function LoadingOperationsRow() {
  return (
    <LoadingContainer>
      <PlaceholderText />
      <LoadingButton />
    </LoadingContainer>
  );
}

export default LoadingOperationsRow;
