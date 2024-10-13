import { FC } from "react";
import { Avatar, Flex, Skeleton } from "@vkontakte/vkui";
import { Text, Currency } from "../ui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
// import { MODAL } from "../routes";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { httpService } from "../services/http.service";
import { UserT } from "../types";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { ITokenSVG } from "../ui/ITokenSVG";

export const ProfilePreview: FC = () => {
  const navigator = useRouteNavigator();
  const [{ access_token }] = useCookies(["access_token"]);

  const { data: user, isLoading: isUserLoading } =
    useQuery<UserT>({
      queryKey: ["user-me"],
      queryFn: () =>
        httpService(access_token).get("/auth/user/me"),
    });

  const { data: vkData, isLoading: isVkLoading } = useQuery({
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
        {isUserLoading || isVkLoading ? (
          <>
            <Skeleton height={20} width={175} />
            <Skeleton height={16} width={75} />
          </>
        ) : (
          <>
            <Text size={20}>
              {vk.first_name} {vk.last_name}
            </Text>
            <Currency size={16}>{user?.tokens}</Currency>
          </>
        )}
      </Flex>
      <Avatar
        noBorder
        size={44}
        style={{ marginLeft: "auto" }}
        // onClick={handleDonate}
      >
        <ITokenSVG width={24} color="primary" />
      </Avatar>
    </Flex>
  );
};
