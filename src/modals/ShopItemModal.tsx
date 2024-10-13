import { FC, useMemo } from "react";
import { Text } from "../ui";
import { Group, Flex, Button } from "@vkontakte/vkui";
import {
  useRouteNavigator,
  useSearchParams,
} from "@vkontakte/vk-mini-apps-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { httpService } from "../services/http.service";
import { useCookies } from "react-cookie";
import { UserInfo } from "@vkontakte/vk-bridge";
import { ErrorAlert } from "../components/ErrorAlert";
import { queryClient } from "../AppConfig";
import { Currency } from "../ui/Currency";
import { ShopItemT } from "../types/shop";

export const ShopItemModal: FC<{ user: UserInfo }> = ({
  user,
}) => {
  const [params] = useSearchParams();
  const item_id = params.get("item_id");

  const [{ access_token }] = useCookies();
  const navigator = useRouteNavigator();

  const { data } = useQuery<ShopItemT>({
    queryKey: ["item"],
    queryFn: () =>
      httpService(access_token).get("/item/" + item_id),
  });

  const item = useMemo(() => (data || {}) as ShopItemT, [data]);

  const imgSrc =
    item.type === "border"
      ? `/items/border-${item.id % 4}.png`
      : `/items/merch-${item.id % 10}.png`;

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
        {item.name}
      </Text>
      {/* <Flex align="center" style={{ columnGap: "6px" }}>
        <Text mb={16}></Text> */}
      <Currency size={16} mb={16}>
        {item.price}
      </Currency>
      <img
        src={imgSrc}
        alt="Изображение не найдено"
        style={{
          aspectRatio: 1,
          width: "100%",
          height: "auto",
          minHeight: "200px",
        }}
      />
      {/* </Flex> */}
      <></>
      <Flex
        direction="row"
        noWrap
        align="center"
        style={{ columnGap: "8px" }}
      >
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
