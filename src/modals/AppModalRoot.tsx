import { FC } from "react";
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { ModalRoot, ModalCard } from "@vkontakte/vkui";
import { MODAL } from "../routes";
import { UserInfo } from "@vkontakte/vk-bridge";
import {
  LoginModal,
  RegisterModal,
  ProfileItemModal,
  ShopItemModal,
  DonateModal,
} from "./";

export const AppModalRoot: FC<{ user: UserInfo }> = ({
  user,
}) => {
  const { modal: activeModal } = useActiveVkuiLocation();
  const navigator = useRouteNavigator();

  const handleClose = () => navigator.hideModal();

  return (
    <ModalRoot activeModal={activeModal} onClose={handleClose}>
      <ModalCard id={MODAL.LOGIN}>
        <LoginModal user={user} />
      </ModalCard>
      <ModalCard id={MODAL.REGISTER}>
        <RegisterModal />
      </ModalCard>
      <ModalCard id={MODAL.PROFILE_ITEM}>
        <ProfileItemModal />
      </ModalCard>
      <ModalCard id={MODAL.SHOP_ITEM}>
        <ShopItemModal />
      </ModalCard>
      <ModalCard id={MODAL.DONATE}>
        <DonateModal />
      </ModalCard>
    </ModalRoot>
  );
};
