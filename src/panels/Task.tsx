import { FC, useEffect } from "react";
import QRCode from "react-qr-code";
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  Flex,
} from "@vkontakte/vkui";
import { Text } from "../ui";
import { TaskT } from "../types";
import { Currency } from "../ui/Currency";
import {
  useSearchParams,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { Icon24Refresh } from "@vkontakte/icons";
import { branchInfo } from "../types/tasks";
import { useCookies } from "react-cookie";
import { useQuery, useMutation } from "@tanstack/react-query";
import { httpService } from "../services/http.service";
import { Button } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { SuccessAlert } from "../components/SuccessAlert";

export const Task: FC<NavIdProps & { user: UserInfo }> = ({
  user,
  id,
}) => {
  const navigator = useRouteNavigator();
  const [{ access_token }] = useCookies(["access_token"]);
  const [params] = useSearchParams();
  const task_id = params.get("task_id");

  const { mutateAsync: asos } = useMutation({
    mutationFn: () =>
      httpService(access_token).post(
        `/task/${task_id}/user/${user.id}`
      ),
  });

  const { data: task } = useQuery<TaskT>({
    queryKey: ["task"],
    queryFn: () =>
      httpService(access_token).get("/task/" + task_id),
  });

  console.log("LOGGG: ", params, task_id);
  console.log("LOGGG after: ", task);

  const handleComplete = async () => {
    navigator.showPopout(
      <SuccessAlert desc="Задание успешно выполнено!" />
    );
  };

  useEffect(() => {
    asos();
  }, [asos]);

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderBack onClick={() => navigator.back()}>
            <Text size={15}>Назад</Text>
          </PanelHeaderBack>
        }
        after={
          <PanelHeaderButton
            onClick={() => navigator.replace("/task" + task_id)}
          >
            <Icon24Refresh />
          </PanelHeaderButton>
        }
        title="Задача c QR-кодом"
      >
        <Text size={15} weight={500}>
          Задача c QR-кодом
        </Text>
      </PanelHeader>
      <div style={{ padding: "22px 24px" }}>
        <Text size={24} weight={600} mb={10}>
          {task?.title}
        </Text>
        <Flex
          direction="row"
          justify="start"
          align="center"
          style={{ columnGap: "8px", marginBottom: "12px" }}
        >
          <Text size={20} weight={600}>
            {branchInfo[task?.branch]?.title}
          </Text>
          <Currency size={20}>
            +{task?.price_tokens || 0}
          </Currency>
        </Flex>
        <Text size={16} mb={22}>
          {task?.text}
        </Text>
        <Flex justify="center">
          <QRCode
            value={JSON.stringify({
              user_id: user.id,
              task_id,
            })}
            style={{
              maxWidth: "245px",
              display: "block",
              marginBottom: "12px",
            }}
          />
        </Flex>
        <Flex
          direction="column"
          justify="center"
          align="center"
          style={{ rowGap: "8px" }}
        >
          <a
            href="https://polytones.online/ar/second/"
            style={{
              display: "block",
              width: "100%",
            }}
            target="_blank"
          >
            <Button size="m" style={{ margin: "0 auto" }}>
              Выполнить с помощью AR
            </Button>
          </a>
          <Button
            onClick={handleComplete}
            mode="secondary"
            size="m"
          >
            Я выполнил
          </Button>
        </Flex>
      </div>
    </Panel>
  );
};
