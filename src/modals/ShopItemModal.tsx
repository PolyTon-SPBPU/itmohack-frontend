import { FC } from "react";
import { Text } from "../ui";
import { Group, Button } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const ShopItemModal: FC = () => {
  const navigator = useRouteNavigator();
  const handleCancel = () => navigator.hideModal();

  return (
    <Group>
      <Text size={18} weight={700} mb={8}>
        Сезон еще не начался
      </Text>
      {/* <Flex align="center" style={{ columnGap: "6px" }}>
        <Text mb={16}></Text> */}
      <Text size={16} mb={16}>
        Подождите еще немного
      </Text>
      <></>
      <Button
        onClick={handleCancel}
        mode="secondary"
        size="m"
        style={{ minWidth: "0", width: "50%" }}
      >
        Отмена
      </Button>
    </Group>
  );
};
