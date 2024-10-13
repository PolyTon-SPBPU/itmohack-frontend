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
    navigator.push(
      `/task?task_id=${task.id}&title=${task.title}&text=${task.text}&price=${task.price_tokens}&branch=${task.branch}`
    );
  };

  const Icon = branchInfo[task.branch].icon;

  return (
    <Card
      style={{
        padding: "12px",
        paddingRight: "14px",
        cursor: "pointer",
        position: "relative",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          position: "absolute",
          right: "14px",
          top: "14px",
          width: "10px",
          height: "10px",
          borderRadius: "100px",
          border: "2px solid var(--color-primary)",
          backgroundColor: task.is_completed
            ? "var(--color-primary)"
            : "transparent",
        }}
      ></div>
      <Text size={14} weight={600} mb={4}>
        {task.title}
      </Text>
      <Text size={12} mb={10}>
        {task.text}
      </Text>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
      >
        <Currency>{task.price_tokens}</Currency>
        <Flex
          align="center"
          justify="end"
          style={{ columnGap: "4px" }}
        >
          <Icon width={14} color="black" />
          <Text size={12} weight={700}>
            {branchInfo[task.branch].title}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
