import { FC } from "react";
import { Card, Flex } from "@vkontakte/vkui";
import { Text, Currency } from "../ui";
import { TaskT } from "../types";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { branchInfo } from "../types/tasks";

type TaskCardPropsT = {
  task: TaskT;
};

export const TaskCard: FC<TaskCardPropsT> = ({ task }) => {
  const navigator = useRouteNavigator();

  const handleClick = () => {
    navigator.push("/task");
  };

  return (
    <Card
      style={{
        padding: "12px",
        paddingRight: "14px",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Text size={14} weight={500} mb={4}>
        {task.title}
      </Text>
      <Text size={12} mb={6}>
        {task.text}
      </Text>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
      >
        <Currency>{task.price_tokens}</Currency>
        <Text size={12} weight={700}>
          {branchInfo[task.branch].title}
        </Text>
      </Flex>
    </Card>
  );
};
