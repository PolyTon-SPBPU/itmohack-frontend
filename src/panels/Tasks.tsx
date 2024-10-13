import { FC, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex, Skeleton } from "@vkontakte/vkui";
import { TaskT } from "../types";
import { TaskCard } from "../components";
import { httpService } from "../services/http.service";
import { useCookies } from "react-cookie";

export const Tasks: FC = () => {
  const [{ access_token }] = useCookies(["access_token"]);
  const { data, isLoading } = useQuery<{ data: TaskT[] }>({
    queryKey: ["tasks"],
    queryFn: () => httpService(access_token).get("/task/my"),
  });

  console.log(data);
  const tasks = useMemo(() => data?.data || [], [data]);

  return (
    <Flex
      direction="column"
      align="stretch"
      style={{ rowGap: "12px", padding: "22px 24px" }}
    >
      {isLoading ? (
        <>
          <Skeleton width="100%" height={84} borderRadius={8} />
          <Skeleton width="100%" height={84} borderRadius={8} />
          <Skeleton width="100%" height={84} borderRadius={8} />
          <Skeleton width="100%" height={84} borderRadius={8} />
          <Skeleton width="100%" height={84} borderRadius={8} />
        </>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      )}
    </Flex>
  );
};
