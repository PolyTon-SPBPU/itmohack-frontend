import { FC } from "react";

import { Card, Avatar } from "@vkontakte/vkui";
import { Text } from "../ui";
import { UserT, LeaderboardUserT } from "../types";
import { Currency } from "../ui/Currency";

type LeaderboardCardPropsT = {
  user: LeaderboardUserT | UserT;
  place: number;
  mine?: boolean;
};

export const LeaderboardCard: FC<LeaderboardCardPropsT> = ({
  user,
  place,
  mine,
}) => {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        columnGap: "8px",
        padding: "12px 14px",
        border: mine
          ? "1px solid var(--color-primary)"
          : undefined,
      }}
    >
      <Text weight={700} style={{ marginRight: "8px" }}>
        {place}.
      </Text>
      <Avatar src="/avatar.png" size={32} />
      <Text>
        {user.first_name} {user.last_name}
      </Text>
      <Currency size={16} style={{ marginLeft: "auto" }}>
        {user.tokens}
      </Currency>
    </Card>
  );
};
