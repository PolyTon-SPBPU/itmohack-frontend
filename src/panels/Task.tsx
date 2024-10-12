import { FC } from "react";
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Flex,
} from "@vkontakte/vkui";
import { Text } from "../ui";
import { TaskT } from "../types";
import { Currency } from "../ui/Currency";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

const MOCK_TASK: TaskT = {
  id: 0,
  title: "Посети мероприятие клуба Let’s art & science!",
  description:
    "Let's Art and Science ИТМО -ждисциплинарный студенческий клуб, целью которого является популяризация и обсуждение области art&science.",
  reward: 1000,
  theme: "Спорт",
};

export const Task: FC<NavIdProps> = ({ id }) => {
  const navigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderBack onClick={() => navigator.back()}>
            <Text size={15}>Назад</Text>
          </PanelHeaderBack>
        }
        title="Задача c QR-кодом"
      >
        <Text size={15} weight={500}>
          Задача c QR-кодом
        </Text>
      </PanelHeader>
      <div style={{ padding: "22px 24px" }}>
        <Text size={24} weight={600} mb={10}>
          {MOCK_TASK.title}
        </Text>
        <Flex
          direction="row"
          justify="start"
          align="center"
          style={{ columnGap: "8px", marginBottom: "12px" }}
        >
          <Text size={20} weight={600}>
            {MOCK_TASK.theme}
          </Text>
          <Currency size={20}>+{MOCK_TASK.reward}</Currency>
        </Flex>
        <Text size={16} mb={22}>
          {MOCK_TASK.description}
        </Text>
        <img
          src="/qr.png"
          alt="Изображение не найдено"
          style={{ maxWidth: "245px", margin: "0 auto" }}
        />
      </div>
    </Panel>
  );
};
