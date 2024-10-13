import { FC } from "react";
import { Flex } from "@vkontakte/vkui";
import { LeaderboardCard } from "../components";
import { Text } from "../ui";
import { LeaderboardUserT } from "../types";
import { Currency } from "../ui/Currency";

const MOCK_USERS: LeaderboardUserT[] = [
  {
    id: 0,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 1,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 2,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 3,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 4,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 5,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 6,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 7,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 8,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 10,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 11,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 12,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
    isYou: true,
  },
  {
    id: 13,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 14,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 15,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
  {
    id: 16,
    name: "Гай Юлий Цезарь",
    balance: 1250,
    avatar: "/avatar.png",
  },
];

export const Leaderboard: FC = () => {
  return (
    <div style={{ padding: "22px 24px" }}>
      <Flex
        direction="row"
        justify="start"
        align="center"
        style={{ columnGap: "4px", marginBottom: "16px" }}
      >
        <Text size={16} weight={700}>
          Всего заработано за сезон:{" "}
        </Text>
        <Currency size={16}>12405</Currency>
      </Flex>
      <Flex
        direction="column"
        align="stretch"
        style={{ rowGap: "12px" }}
      >
        {MOCK_USERS.slice(0, 10).map((user, index) => (
          <LeaderboardCard
            key={user.id}
            place={index + 1}
            user={user}
          />
        ))}
        <Text
          weight={700}
          size={22}
          style={{
            margin: "6px 0",
            marginTop: "2px",
            textAlign: "center",
          }}
        >
          ...
        </Text>
        {MOCK_USERS.slice(10, 13).map((user, index) => (
          <LeaderboardCard
            key={user.id}
            place={index + 11}
            user={user}
          />
        ))}
        <LeaderboardCard
          key={MOCK_USERS[13].id}
          place={14}
          user={MOCK_USERS[13]}
          mine
        />
        {MOCK_USERS.slice(14).map((user, index) => (
          <LeaderboardCard
            key={user.id}
            place={index + 15}
            user={user}
          />
        ))}
      </Flex>
    </div>
  );
};
