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
import {
  useParams,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { branchInfo } from "../types/tasks";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { httpService } from "../services/http.service";
import { Button } from "@vkontakte/vkui";

export const Task: FC<NavIdProps> = ({ id }) => {
  const [{ access_token }] = useCookies(["access_token"]);
  const { task_id } = useParams<"task_id">();

  const navigator = useRouteNavigator();
  const { data } = useQuery<TaskT>({
    queryKey: ["task"],
    queryFn: () => httpService(access_token).get("/task"),
  });

  const task = (data || {}) as TaskT;

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
          {task.title}
        </Text>
        <Flex
          direction="row"
          justify="start"
          align="center"
          style={{ columnGap: "8px", marginBottom: "12px" }}
        >
          <Text size={20} weight={600}>
            {branchInfo[task.branch].title}
          </Text>
          <Currency size={20}>+{task.price_tokens}</Currency>
        </Flex>
        <Text size={16} mb={22}>
          {task.text}
        </Text>
        <Flex justify="center">
          <img
            src="/qr.png"
            alt="Изображение не найдено"
            style={{
              maxWidth: "245px",
              display: "block",
            }}
          />
        </Flex>
      </div>
      <a
        href={`https://polytones.online/ar/first/?access_token=${access_token}&task_id=${task_id}`}
      >
        <Text>Нажми, чтобы получить награду</Text>
      </a>
      <Button size="m">Проверить выполнение</Button>
    </Panel>
  );
};
