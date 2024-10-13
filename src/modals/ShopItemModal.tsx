import { FC } from "react";
import { Text } from "../ui";
import { Group, Flex, Button } from "@vkontakte/vkui";
import {
  useRouteNavigator,
  useSearchParams,
} from "@vkontakte/vk-mini-apps-router";
import { useMutation } from "@tanstack/react-query";
import { httpService } from "../services/http.service";
import { useCookies } from "react-cookie";
import { UserInfo } from "@vkontakte/vk-bridge";
import { ErrorAlert } from "../components/ErrorAlert";
import { queryClient } from "../AppConfig";

export const ShopItemModal: FC<{ user: UserInfo }> = ({
  user,
}) => {
  const [params] = useSearchParams();
  const item_id = params.get("item_id");

  const [{ access_token }] = useCookies();
  const navigator = useRouteNavigator();
  const { mutateAsync: buy } = useMutation({
    mutationFn: () =>
      httpService(access_token).post(
        `/item/${item_id}/user/${user.id}`
      ),
  });

  const handleSubmit = async () => {
    try {
      await buy();
      queryClient.resetQueries({ queryKey: ["user-me"] });
      queryClient.resetQueries({ queryKey: ["vk-user"] });
      queryClient.resetQueries({ queryKey: ["my-items"] });
    } catch (err) {
      navigator.showPopout(<ErrorAlert error={err} />);
    }
  };

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
          Купить
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
