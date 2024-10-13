import { FC, useState, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Text } from "../ui";
import { Group, Input, Button } from "@vkontakte/vkui";
import {
  useParams,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import { httpService } from "../services";
import { useCookies } from "react-cookie";

export const LoginModal: FC = () => {
  const userId = useParams<"used_id">();
  const { mutateAsync: login } = useMutation({
    mutationFn: (data: unknown) =>
      httpService().post("/auth/login", data),
  });
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [pinCode, setPinCode] = useState<string>("");
  const navigator = useRouteNavigator();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPinCode(e.target.value.slice(0, 80));
  };

  const handleSubmit = async () => {
    const submitData = {
      username: userId,
      password: pinCode,
    };

    try {
      const { data } = await login(submitData);
      setCookies("access_token", data.access_token);
      navigator.hideModal();
    } catch (err) {
      setPinCode("");
    }
  };

  return (
    <Group>
      <Text size={18} weight={700} mb={8}>
        Привет, Илья!
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
