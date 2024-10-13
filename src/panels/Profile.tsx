import { FC, useMemo } from "react";
import {
  Panel,
  NavIdProps,
  Flex,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { Text, Currency } from "../ui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { ShopItemT, UserT } from "../types";
import { ProfileItem } from "../components/ProfileItem";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { httpService } from "../services/http.service";
import bridge from "@vkontakte/vk-bridge";
import { ItemCategoryT } from "../types/shop";
import { Skeleton, Avatar } from "@vkontakte/vkui";

export const Profile: FC<NavIdProps> = ({ id }) => {
  const navigator = useRouteNavigator();
  const [{ access_token }] = useCookies(["access_token"]);

  const { data: user } = useQuery<UserT>({
    queryKey: ["user-me"],
    queryFn: () =>
      httpService(access_token).get("/auth/user/me"),
  });

  const { data: vkData } = useQuery({
    queryKey: ["vk-user"],
    queryFn: () => bridge.send("VKWebAppGetUserInfo"),
  });
  const vk = (vkData || {}) as UserInfo;

  const { data, isLoading: isItemsLoading } = useQuery<{
    data: ShopItemT[];
  }>({
    queryKey: ["my-items"],
    queryFn: () => httpService(access_token).get("/item/my"),
  });

  const items = useMemo(
    () =>
      data?.data.map((item) => ({
        ...item,
        type: (item.name.toLowerCase().includes("рамка")
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
          <Currency size={24}>{user?.tokens}</Currency>
        </Flex>
        <Flex
          direction="row"
          noWrap
          justify="start"
          style={{ columnGap: "12px", marginBottom: "16px" }}
        >
          <Avatar
            size={120}
            src={vk.photo_200}
            style={{
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
              <Currency type="points" size={15}>
                {user?.art}
              </Currency>
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
              <Currency type="points" size={15}>
                {user?.game}
              </Currency>
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
              <Currency type="points" size={15}>
                {user?.it}
              </Currency>
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
              <Currency type="points" size={15}>
                {user?.science}
              </Currency>
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
              <Currency type="points" size={15}>
                {user?.sport}
              </Currency>
            </Flex>
          </Flex>
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
          {isItemsLoading ? (
            <>
              <Skeleton
                width="22%"
                height={100}
                borderRadius={8}
              />
              <Skeleton
                width="22%"
                height={100}
                borderRadius={8}
              />
              <Skeleton
                width="22%"
                height={100}
                borderRadius={8}
              />
              <Skeleton
                width="22%"
                height={100}
                borderRadius={8}
              />
            </>
          ) : !items.length ? (
            <Text>Пока что ничего нет</Text>
          ) : (
            items
              .filter((item) => item.type === "border")
              .map((item) => (
                <ProfileItem key={item.id} item={item} />
              ))
          )}
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
          {isItemsLoading ? (
            <>
              <Skeleton
                width="22%"
                height={100}
                borderRadius={8}
              />
              <Skeleton
                width="22%"
                height={100}
                borderRadius={8}
              />
              <Skeleton
                width="22%"
                height={100}
                borderRadius={8}
              />
              <Skeleton
                width="22%"
                height={100}
                borderRadius={8}
              />
            </>
          ) : !items.length ? (
            <Text>Пока что ничего нет</Text>
          ) : (
            items
              .filter((item) => item.type === "merch")
              .map((item) => (
                <ProfileItem key={item.id} item={item} />
              ))
          )}
        </Flex>
      </div>
      <Text
        size={14}
        style={{
          marginTop: "auto",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        Возникли проблемы? Пишите нам! <br />
        polytoneteam@gmail.com
      </Text>
    </Panel>
  );
};
