import styled from "styled-components";
import { useSettings } from "../features/selectLeague/useSettings";

import { IoNotificationsOutline } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { HiMiniUser } from "react-icons/hi2";

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 128px;
  height: 52px;

  gap: 24px;
`;

const RoundedContainer = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--color-grey-0);

  svg {
    font-size: 24px;
    /* color: var(--color-primary-500); */
  }
`;

const NotificationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    outline: none; /* Убираем стандартное выделение */
    color: var(--color-secondary-400);
  }

  &:focus {
    outline: none;
    color: var(--color-secondary-400);
  }

  &:active {
    background-color: darkgray; /* Добавляем стили при нажатии */
    color: var(--color-secondary-500);
  }
`;

const UserAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledIoMdNotifications = styled(IoMdNotifications)`
  font-size: 24px;
  color: var(--color-primary-500);
`;

const StyledIoNotificationsOutline = styled(IoNotificationsOutline)`
  font-size: 24px;
  color: var(--color-secondary-300);
`;

const StyledHiMiniUser = styled(HiMiniUser)`
  color: var(--color-primary-500);
`;

function User() {
  const { settings, isLoading } = useSettings();
  const avatar = settings?.default_avatar;

  return (
    <UserContainer>
      <RoundedContainer>
        <NotificationButton>
          {isLoading && <StyledIoMdNotifications />}
          {!isLoading && <StyledIoNotificationsOutline />}
        </NotificationButton>
      </RoundedContainer>
      <RoundedContainer>
        {isLoading && <StyledHiMiniUser />}
        {!isLoading && <UserAvatar src={avatar} />}
      </RoundedContainer>
    </UserContainer>
  );
}

export default User;
