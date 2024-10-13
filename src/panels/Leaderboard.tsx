import { FC, useMemo } from "react";
import { Flex, Skeleton } from "@vkontakte/vkui";
import { LeaderboardCard } from "../components";
import { Text } from "../ui";
import { httpService } from "../services/http.service";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { UserT } from "../types";
import bridge from "@vkontakte/vk-bridge";
import { UserInfo } from "@vkontakte/vk-bridge";

export const Leaderboard: FC = () => {
  const [{ access_token }] = useCookies(["access_token"]);
  const { data, isLoading } = useQuery<{ data: UserT[] }>({
    queryKey: ["users"],
    queryFn: () => httpService(access_token).get("/user"),
  });
  const users = useMemo(() => data?.data || [], [data]);

  const { data: vkData } = useQuery({
    queryKey: ["vk-user"],
    queryFn: () => bridge.send("VKWebAppGetUserInfo"),
  });
  const vk = (vkData || {}) as UserInfo;

  return (
    <div style={{ padding: "22px 24px" }}>
      {/* <Flex
        direction="row"
        justify="start"
        align="center"
        style={{ columnGap: "4px", marginBottom: "16px" }}
      >
        <Text size={16} weight={700}>
          Всего заработано за сезон:{" "}
        </Text>
        <Currency size={16}>12405</Currency>
      </Flex> */}
      <Flex
        direction="column"
        align="stretch"
        style={{ rowGap: "12px" }}
      >
        {isLoading ? (
          <>
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
          </>
        ) : (
          users
            .slice(0, 15)
            .map((user, index) => (
              <LeaderboardCard
                key={user.id}
                place={index + 1}
                user={user}
                mine={user.id == vk?.id}
              />
            ))
        )}
        {/* <Text
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
        {isLoading ? (
          <>
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
            <Skeleton
              width="100%"
              height={40}
              borderRadius={8}
            />
          </>
        ) : (
          users
            .slice(10, 16)
            .map((user, index) => (
              <LeaderboardCard
                key={user.id}
                place={index + 11}
                user={user}
                mine={user.id == vk?.id}
              />
            ))
        )} */}
      </Flex>
    </div>
  );
};
