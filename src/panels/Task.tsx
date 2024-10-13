import { FC, useEffect } from "react";
import QRCode from "react-qr-code";
import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Flex,
} from "@vkontakte/vkui";
import { Text } from "../ui";
import { Currency } from "../ui/Currency";
import {
  useSearchParams,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { branchInfo } from "../types/tasks";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
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
  const title = params.get("title");
  const text = params.get("text");
  const price = params.get("price");
  const branch = params.get("branch");

  const { mutateAsync: asos } = useMutation({
    mutationFn: () =>
      httpService(access_token).post(
        `/task/${task_id}/user/${user.id}`
      ),
  });

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
        title="Задача c QR-кодом"
      >
        <Text size={15} weight={500}>
          Задача c QR-кодом
        </Text>
      </PanelHeader>
      <div style={{ padding: "22px 24px" }}>
        <Text size={24} weight={600} mb={10}>
          {title}
        </Text>
        <Flex
          direction="row"
          justify="start"
          align="center"
          style={{ columnGap: "8px", marginBottom: "12px" }}
        >
          <Text size={20} weight={600}>
            {branchInfo[branch]?.title}
          </Text>
          <Currency size={20}>+{price}</Currency>
        </Flex>
        <Text size={16} mb={22}>
          {text}
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
        <a
          href={`https://polytones.online/ar/first/?access_token=${access_token}&task_id=${task_id}`}
          style={{
            display: "block",
            width: "100%",
            marginBottom: "8px",
          }}
          target="_blank"
        >
          <Button size="m">Получить награду</Button>
        </a>
        {task_id === "3" && (
          <a
            href={`https://polytones.online/ar/second/?access_token=${access_token}&task_id=${task_id}`}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "8px",
            }}
            target="_blank"
          >
            <Button size="m" mode="outline">
              Выполнить с помощью AR
            </Button>
          </a>
        )}
        <Button
          onClick={handleComplete}
          mode="secondary"
          size="m"
        >
          Задача выполнена
        </Button>
      </div>
    </Panel>
  );
};
