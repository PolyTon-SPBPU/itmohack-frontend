import { FC } from "react";

import { Card, Avatar } from "@vkontakte/vkui";
import { Text } from "../ui";
import { LeaderboardUserT } from "../types";
import { Currency } from "../ui/Currency";

type LeaderboardCardPropsT = {
  user: LeaderboardUserT;
  place: number;
};

export const LeaderboardCard: FC<LeaderboardCardPropsT> = ({
  user,
  place,
}) => {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        columnGap: "8px",
        padding: '12px 14px'
      }}
    >
      <Text weight={700} style={{ marginRight: "8px" }}>
        {place}.
      </Text>
      <Avatar src="/avatar.png" size={32} />
      <Text>{user.name}</Text>
      <Currency size={16} style={{ marginLeft: "auto" }}>
        {user.balance}
      </Currency>
    </Card>
  );
};
