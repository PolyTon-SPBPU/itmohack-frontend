import { FC } from "react";
import { Text } from "../ui";
import { Group, Flex, Button } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const ProfileItemModal: FC = () => {
  const navigator = useRouteNavigator();

  const handleSubmit = () => {};
  const handleCancel = () => navigator.hideModal();

  return (
    <Group>
      <Text size={18} weight={700} mb={8}>
        Привет
      </Text>
      <Text mb={16}>Приложение</Text>
      <Flex direction="row" noWrap align="center">
        <Button
          onClick={handleSubmit}
          size="m"
          style={{ minWidth: "0", width: "50%" }}
        >
          Использовать
        </Button>
        <Button
          onClick={handleCancel}
          mode="secondary"
          size="m"
          style={{ minWidth: "0", width: "50%" }}
        >
          Отмена
        </Button>
      </Flex>
    </Group>
  );
};
