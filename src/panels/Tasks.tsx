import { FC } from "react";
import { Flex } from "@vkontakte/vkui";
import { TaskT } from "../types";
import { TaskCard } from "../components";

const MOCK_TASKS: TaskT[] = [
  {
    id: 0,
    title: "Посети мероприятие клуба Let’s art & science!",
    description:
      "Let's Art and Science ИТМО -дисциплинарный студенчески...",
    reward: 1000,
    theme: "Спорт",
  },
  {
    id: 1,
    title: "2 Посети мероприятие клуба Let’s art & science!",
    description:
      "Let's Art and Science ИТМО -дисциплинарный студенчески...",
    reward: 2000,
    theme: "Исскуство и культура",
  },
  {
    id: 2,
    title: "3 Посети мероприятие клуба Let’s art & science!",
    description:
      "Let's Art and Science ИТМО -дисциплинарный студенчески...",
    reward: 3000,
    theme: "Программирование",
  },
];

export const Tasks: FC = () => {
  return (
    <Flex
      direction="column"
      align="stretch"
      style={{ rowGap: "12px", padding: "22px 24px" }}
    >
      {MOCK_TASKS.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Flex>
  );
};
