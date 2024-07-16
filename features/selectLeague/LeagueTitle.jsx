import styled from "styled-components";

import Heading from "../../ui/Heading";
import LeagueSelector from "./LeagueSelector";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";

import { useSelector } from "react-redux";

import { useSettings } from "./useSettings";

const StyledTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.2rem;
`;

const Img = styled.img`
  height: 7rem;
  width: auto;
  border-radius: 1rem;
`;

function Title() {
  // Local State
  const { leagueTier, leagueLogo } = useSelector((state) => state.league);

  // Remote State
  const { settings: { season } = {}, isLoading } = useSettings();

  return (
    <StyledTitleDiv>
      <Row type="horizontal">
        <Img src={leagueLogo} alt="Logo" />
        <LeagueSelector />
      </Row>
      <Heading>
        <Row type="gorizontal">
          {leagueTier}. Сезон:{" "}
          {season ? season : <Spinner isLoading={isLoading} />}
        </Row>
      </Heading>
    </StyledTitleDiv>
  );
}

export default Title;
