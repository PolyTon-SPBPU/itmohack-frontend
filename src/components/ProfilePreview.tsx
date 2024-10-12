import { FC } from "react";
import { Avatar, Flex } from "@vkontakte/vkui";
import { Text, Currency } from "../ui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export const ProfilePreview: FC = () => {
  const navigator = useRouteNavigator();

  const handleClick = () => navigator.push("/profile");

  return (
    <Flex
      direction="row"
      align="center"
      justify="start"
      style={{ columnGap: "16px" }}
    >
      <Avatar
        src="/avatar.png"
        size={64}
        onClick={handleClick}
      />
      <Flex
        direction="column"
        align="start"
        justify="center"
        onClick={handleClick}
        style={{ rowGap: "4px" }}
      >
        <Text size={20}>Илья Глинский</Text>
        <Currency size={16}>1250</Currency>
      </Flex>
      <Avatar noBorder size={44} style={{ marginLeft: "auto" }}>
        <img
          src="/i-token.svg"
          alt="И"
          height={20}
          width={15.6}
          style={{ transform: `translateY(-1px)` }}
        />
      </Avatar>
    </Flex>
  );
};
