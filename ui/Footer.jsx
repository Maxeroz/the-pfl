import styled from "styled-components";
import Row from "./Row";

import { HiMiniPhoneArrowDownLeft } from "react-icons/hi2";
import { FaTelegramPlane } from "react-icons/fa";
import PhoneLink from "./PhoneLink";
import TelegramLink from "./TelegramLink";

const FooterContainer = styled.footer`
  background-color: var(--color-grey-100);

  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  border: 1px solid;
  border-bottom: none;

  margin: 0 2rem;
  padding: 1rem 2rem;

  min-width: 550px;

  /* position: relative; */
  /* bottom: 0; */
`;

const Information = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TitleSpan = styled.span`
  font-weight: 600;
`;

const YearSpan = styled.span`
  font-weight: 600;
`;

function Footer() {
  const phoneNumber = "+79297720004";
  const telegramUrl = "https://t.me/pkr_e";

  return (
    <FooterContainer>
      <Row type="horizontal">
        <Information>
          <TitleSpan>Покровская футбольная лига.</TitleSpan>

          <PhoneLink href={`tel:${phoneNumber}`}>
            <HiMiniPhoneArrowDownLeft />
            {phoneNumber}
          </PhoneLink>

          <TelegramLink
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane />
            {telegramUrl}
          </TelegramLink>
        </Information>

        <YearSpan>2024 - 2024 © The PFL</YearSpan>
      </Row>
    </FooterContainer>
  );
}

export default Footer;
