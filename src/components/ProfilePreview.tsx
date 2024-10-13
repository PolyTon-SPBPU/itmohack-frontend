import { FC } from "react";
import { Avatar, Flex } from "@vkontakte/vkui";
import { Text, Currency } from "../ui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
// import { MODAL } from "../routes";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { httpService } from "../services/http.service";
import { UserMeT } from "../types";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";

export const ProfilePreview: FC = () => {
  const navigator = useRouteNavigator();
  const [{ access_token }] = useCookies(["access_token"]);

  const { data: userData } = useQuery<UserMeT>({
    queryKey: ["user-me"],
    queryFn: () =>
      httpService(access_token).get("/auth/user/me"),
  });
  const user = (userData || {}) as UserMeT;

  const { data: vkData } = useQuery({
    queryKey: ["vk-user"],
    queryFn: () => bridge.send("VKWebAppGetUserInfo"),
  });
  const vk = (vkData || {}) as UserInfo;

  const handleClick = () => navigator.push("/profile");

  return (
    <Flex
      direction="row"
      align="center"
      justify="start"
      style={{ columnGap: "16px" }}
    >
      <Avatar
        src={vk.photo_100}
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
        <Text size={20}>
          {vk.first_name} {vk.last_name}
        </Text>
        <Currency size={16}>{user.tokens}</Currency>
      </Flex>
      <Avatar
        noBorder
        size={44}
        style={{ marginLeft: "auto" }}
        // onClick={handleDonate}
      >
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
