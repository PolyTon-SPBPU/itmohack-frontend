import { FC, useState, ChangeEvent } from "react";
import { Text } from "../ui";
import { Group, Input, Button } from "@vkontakte/vkui";
import { httpService } from "../services";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { MODAL } from "../routes";
import bridge from "@vkontakte/vk-bridge";
import { useMutation } from "@tanstack/react-query";
import { ErrorAlert } from "../components";
import { UserInfo } from "@vkontakte/vk-bridge";

export const RegisterModal: FC<{ user: UserInfo }> = ({
  user,
}) => {
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
      navigator.showPopout(<ErrorAlert error={err} />);
      setPinCode("");
    }
  };

  return (
    <Group>
      <Text size={18} weight={700} mb={8}>
        Привет, {user.first_name}!
      </Text>
      <Text mb={16}>Придумай надежный пин-код</Text>
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
