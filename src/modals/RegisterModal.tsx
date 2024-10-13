import { FC, useState, ChangeEvent } from "react";
import { Text } from "../ui";
import { Group, Input, Button } from "@vkontakte/vkui";
import { httpService } from "../services";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { MODAL } from "../routes";
import bridge from "@vkontakte/vk-bridge";
import { useMutation } from "@tanstack/react-query";

export const RegisterModal: FC = () => {
  const navigator = useRouteNavigator();
  const [pinCode, setPinCode] = useState<string>("");

  const { mutateAsync: register } = useMutation({
    mutationFn: (data: unknown) =>
      httpService().post("/auth/register", data),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPinCode(e.target.value.slice(0, 80));
  };

  const handleSubmit = async () => {
    const launchParams = await bridge.send(
      "VKWebAppGetLaunchParams"
    );

    const submitData = {
      password: pinCode,
      start_params: launchParams,
    };

    try {
      await register(submitData);
      navigator.showModal(MODAL.LOGIN);
    } catch (err) {
      setPinCode("");
    }
  };

  return (
    <Group>
      <Text size={18} weight={700} mb={8}>
        Привет, Илья!
      </Text>
      <Text mb={16}>
        Введи надежный пин-код для доступа к приложению
      </Text>
      <Input
        type="password"
        style={{ marginBottom: "24px" }}
        value={pinCode}
        onChange={handleChange}
      />
      <Button
        disabled={pinCode.length < 6}
        onClick={handleSubmit}
        size="m"
      >
        Продолжить
      </Button>
    </Group>
  );
};
