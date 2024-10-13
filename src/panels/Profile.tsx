import { FC, useMemo } from "react";
import {
  Panel,
  NavIdProps,
  Flex,
  Button,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Text, Currency } from "../ui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { ShopItemT } from "../types";
import { ProfileItem } from "../components/ProfileItem";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { UserT } from "../types/users";
import { httpService } from "../services/http.service";
import bridge from "@vkontakte/vk-bridge";
import { ItemCategoryT } from "../types/shop";

export const Profile: FC<NavIdProps> = ({ id }) => {
  const navigator = useRouteNavigator();
  const [{ access_token }] = useCookies(["access_token"]);

  const { data: userData } = useQuery<UserT>({
    queryKey: ["user-me"],
    queryFn: () =>
      httpService(access_token).get("/auth/user/me"),
  });
  const user = (userData || {}) as UserT;

  const { data: vkData } = useQuery({
    queryKey: ["vk-user"],
    queryFn: () => bridge.send("VKWebAppGetUserInfo"),
  });
  const vk = (vkData || {}) as UserInfo;

  const { data } = useQuery<ShopItemT[]>({
    queryKey: ["my-items"],
    queryFn: () => httpService(access_token).get("/item/my"),
  });

  const items = useMemo(
    () =>
      data?.map((item) => ({
        ...item,
        type: (item.name.includes("r")
          ? "border"
          : "merch") as ItemCategoryT,
      })) || [],
    [data]
  );

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderBack onClick={() => navigator.back()}>
            <Text size={15}>Назад</Text>
          </PanelHeaderBack>
        }
        title="Профиль"
      >
        <Text size={15} weight={500}>
          Профиль
        </Text>
      </PanelHeader>
      <div style={{ padding: "22px 24px" }}>
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          style={{ marginBottom: "18px" }}
        >
          <Text size={24} weight={600}>
            {vk.first_name} {vk.last_name}
          </Text>
          <Currency size={24}>{user.tokens}</Currency>
        </Flex>
        <Flex
          direction="row"
          noWrap
          justify="start"
          style={{ columnGap: "10px", marginBottom: "14px" }}
        >
          <img
            src={vk.photo_200}
            alt="Изображение не найдено"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "12px",
            }}
          />
          <Flex
            direction="column"
            align="start"
            justify="center"
            style={{ rowGap: "6px" }}
          >
            <Flex
              direction="row"
              justify="start"
              align="center"
              style={{ columnGap: "6px" }}
            >
              <Text size={15} weight={700}>
                Искусство и культура
              </Text>
              <Currency size={15}>{user.art}</Currency>
            </Flex>
            <Flex
              direction="row"
              justify="start"
              align="center"
              style={{ columnGap: "6px" }}
            >
              <Text size={15} weight={700}>
                Киберспорт
              </Text>
              <Currency size={15}>{user.game}</Currency>
            </Flex>
            <Flex
              direction="row"
              justify="start"
              align="center"
              style={{ columnGap: "6px" }}
            >
              <Text size={15} weight={700}>
                Программирование
              </Text>
              <Currency size={15}>{user.it}</Currency>
            </Flex>
            <Flex
              direction="row"
              justify="start"
              align="center"
              style={{ columnGap: "6px" }}
            >
              <Text size={15} weight={700}>
                Точные и реальные науки
              </Text>
              <Currency size={15}>{user.science}</Currency>
            </Flex>
            <Flex
              direction="row"
              justify="start"
              align="center"
              style={{ columnGap: "6px" }}
            >
              <Text size={15} weight={700}>
                Спорт
              </Text>
              <Currency size={15}>{user.sport}</Currency>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          direction="row"
          justify="start"
          align="center"
          style={{ columnGap: "8px", marginBottom: "14px" }}
        >
          <Button mode="primary">Рейтинг</Button>
          <Button mode="secondary">Поделиться</Button>
        </Flex>
        <Text size={16} weight={600} mb={10}>
          Рамки:
        </Text>
        <Flex
          direction="row"
          justify="start"
          align="start"
          style={{ columnGap: "12px", marginBottom: "20px" }}
        >
          {items
            .filter((item) => item.type === "border")
            .map((item) => (
              <ProfileItem key={item.id} item={item} />
            ))}
        </Flex>
        <Text size={16} weight={600} mb={10}>
          Мерч:
        </Text>
        <Flex
          direction="row"
          justify="start"
          align="start"
          style={{ columnGap: "12px" }}
        >
          {items
            .filter((item) => item.type === "merch")
            .map((item) => (
              <ProfileItem key={item.id} item={item} />
            ))}
        </Flex>
      </div>
    </Panel>
  );
};
