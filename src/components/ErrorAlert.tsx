import { FC } from "react";
import { Alert } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

type ErrorAlertPropsT = {
  error?: string;
};

export const ErrorAlert: FC<ErrorAlertPropsT> = ({ error }) => {
  const navigator = useRouteNavigator();

  const handleClose = () => navigator.hidePopout();

  return (
    <div>
      <Alert
        onClose={handleClose}
        header="Что-то пошло не так"
        text={`Ошибка: ${error}`}
        actions={[
          {
            title: "Ок",
            mode: "default",
          },
        ]}
      />
    </div>
  );
};
