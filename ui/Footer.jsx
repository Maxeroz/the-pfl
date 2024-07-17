import styled from "styled-components";
import Row from "./Row";

import { HiMiniPhoneArrowDownLeft } from "react-icons/hi2";
import { FaTelegramPlane } from "react-icons/fa";

import PhoneLink from "./PhoneLink";
import TelegramLink from "./TelegramLink";
import { SlSocialVkontakte } from "react-icons/sl";
import { HiEnvelope } from "react-icons/hi2";
import VkLink from "./VkLink";
import EmailLink from "./EmailLink";

const FooterContainer = styled.footer`
  background-color: var(--color-grey-100);

  border-top-left-radius: var(--border-radius-lg);
  border-top-right-radius: var(--border-radius-lg);

  box-shadow: var(--shadow-lg);

  padding: 1rem 2rem;
  min-width: 700px;

  margin: 0 auto;
  width: 90%;
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

const phoneNumber = "+79297720004";
const telegramUrl = "https://t.me/pkr_e";
const vkUrl = "https://vk.com/pfl2023";
const emailUrl = "2023pfl@gmail.com";

function Footer() {
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
          </TelegramLink>

          <VkLink href={vkUrl} target="_blank" rel="noopener noreferrer">
            <SlSocialVkontakte />
          </VkLink>

          <EmailLink href={`mailto:${emailUrl}`}>
            <HiEnvelope />
          </EmailLink>
        </Information>

        <YearSpan>2023 - 2024 © The PFL</YearSpan>
      </Row>
    </FooterContainer>
  );
}

export default Footer;
