import { FC, useState, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Text } from "../ui";
import { Group, Input, Button } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { httpService } from "../services";
import { useCookies } from "react-cookie";
import { ErrorAlert } from "../components";
import bridge from "@vkontakte/vk-bridge";
import { UserInfo } from "@vkontakte/vk-bridge";

export const LoginModal: FC<{ user: UserInfo }> = ({ user }) => {
  const [{ access_token }, setCookies] = useCookies([
    "access_token",
  ]);
  const { mutateAsync: patchUser } = useMutation({
    mutationFn: (data: {
      access_token: string;
      birthday: string;
      first_name: string;
      last_name: string;
    }) => httpService(access_token).patch("/auth/user/me", data),
  });

  const { mutateAsync: login } = useMutation({
    mutationFn: (data: unknown) =>
      httpService().post("/auth/login", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
  });
  const [pinCode, setPinCode] = useState<string>("");
  const navigator = useRouteNavigator();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPinCode(e.target.value.slice(0, 80));
  };

  const handleSubmit = async () => {
    const launchParams = await bridge.send(
      "VKWebAppGetLaunchParams"
    );

    const submitData = {
      username: launchParams.vk_user_id + "",
      password: pinCode,
    };

    try {
      const { data } = await login(submitData);
      setCookies("access_token", data.access_token);
      await patchUser({
        ...user,
        access_token,
        birthday: user.bdate,
      });
      navigator.hideModal();
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
      <Text mb={16}>Введи пин-код для входа в приложение</Text>
      <Input
        type="password"
        style={{ marginBottom: "24px" }}
        value={pinCode}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit} size="m">
        Продолжить
      </Button>
    </Group>
  );
};
