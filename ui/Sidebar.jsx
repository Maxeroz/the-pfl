import styled from "styled-components";
import StatisticsBlock from "./StatisticsBlock";

const RightSidebar = styled.div`
  width: 25%;
  background-color: #fff;
  padding: 32px;
  min-width: 450px;

  @media (max-width: 900px) {
    display: none;
  }
`;

function Sidebar() {
  return (
    <RightSidebar>
      <StatisticsBlock light="light" width="100%" />
    </RightSidebar>
  );
}

export default Sidebar;
