import { FC } from "react";
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

export interface ProfilePropsT extends NavIdProps {
  fetchedUser?: UserInfo;
}

const MOCK_ITEMS: ShopItemT[] = [
  {
    id: 0,
    price: 1000,
    type: "border",
  },
  {
    id: 1,
    price: 2000,
    type: "border",
  },
  {
    id: 2,
    price: 3000,
    type: "border",
  },
];

type ProfileT = {
  total_balance: number;
  balance: number;
  sport: number;
  cybersport: number;
  programming: number;
  art: number;
  science: number;
};

const MOCK_USER: UserInfo & ProfileT = {
  id: 0,
  first_name: "Илья",
  last_name: "Глинский",
  sex: 1,
  city: {
    id: 0,
    title: "Санкт-Петербург",
  },
  country: {
    id: 0,
    title: "Россия",
  },
  photo_100: "/avatar.png",
  photo_200: "/avatar.png",
  total_balance: 9050,
  balance: 4250,
  art: 1250,
  cybersport: 250,
  programming: 1200,
  science: 150,
  sport: 1000,
};

export const Profile: FC<ProfilePropsT> = ({
  id,
  fetchedUser,
}) => {
  const navigator = useRouteNavigator();
  console.log(fetchedUser);

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
            {MOCK_USER.first_name} {MOCK_USER.last_name}
          </Text>
          <Currency size={24}>{MOCK_USER.balance}</Currency>
        </Flex>
        <Flex
          direction="row"
          noWrap
          justify="start"
          style={{ columnGap: "10px", marginBottom: "14px" }}
        >
          <img
            src={MOCK_USER.photo_200}
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
              <Currency size={15}>{MOCK_USER.art}</Currency>
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
              <Currency size={15}>
                {MOCK_USER.cybersport}
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
              <Currency size={15}>
                {MOCK_USER.programming}
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
              <Currency size={15}>{MOCK_USER.science}</Currency>
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
              <Currency size={15}>{MOCK_USER.sport}</Currency>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          direction="row"
          justify="start"
          align="center"
          style={{ columnGap: "4px", marginBottom: "10px" }}
        >
          <Text size={16} weight={700}>
            Всего заработано за сезон:{" "}
          </Text>
          <Currency size={16}>
            {MOCK_USER.total_balance}
          </Currency>
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
          {MOCK_ITEMS.map((item) => (
            <ProfileItem key={item.id} />
          ))}
        </Flex>
        <Text size={16} weight={600} mb={10}>
          Шапки:
        </Text>
        <Flex
          direction="row"
          justify="start"
          align="start"
          style={{ columnGap: "12px" }}
        >
          {MOCK_ITEMS.map((item) => (
            <ProfileItem key={item.id} />
          ))}
        </Flex>
      </div>
    </Panel>
  );
};
