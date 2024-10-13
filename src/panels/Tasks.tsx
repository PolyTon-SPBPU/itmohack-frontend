import { FC, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex } from "@vkontakte/vkui";
import { TaskT } from "../types";
import { TaskCard } from "../components";
import { httpService } from "../services/http.service";
import { useCookies } from "react-cookie";

export const Tasks: FC = () => {
  const [{ access_token }] = useCookies(["access_token"]);
  const { data } = useQuery<TaskT[]>({
    queryKey: ["tasks"],
    queryFn: () => httpService(access_token).get("/task"),
  });

  const tasks = useMemo(() => data || [], [data]);

  return (
    <Flex
      direction="column"
      align="stretch"
      style={{ rowGap: "12px", padding: "22px 24px" }}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Flex>
  );
};
