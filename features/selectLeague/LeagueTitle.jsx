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

  background-color: var(--color-grey-50);
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  border: 1px solid;
  border-top: none;

  min-width: 550px;

  margin: 0 2rem;
  padding: 1rem 2rem;
`;

const Img = styled.img`
  height: 7rem;
  width: auto;
  border-radius: 1rem;
`;

const LeagueHeading = styled.span`
  font-weight: 500;
  color: var(--color-grey-700);
`;

const SeasonSpan = styled.span`
  color: var(--color-blue-700);
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
        <Row type="horizontal">
          <LeagueHeading>{leagueTier}. Сезон:</LeagueHeading>
          {season ? (
            <SeasonSpan>{season}</SeasonSpan>
          ) : (
            <Spinner isLoading={isLoading} />
          )}
        </Row>
      </Heading>
    </StyledTitleDiv>
  );
}

export default Title;
