import { FC } from "react";
import { Alert } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

type ErrorAlertPropsT = {
  desc?: string;
};

export const SuccessAlert: FC<ErrorAlertPropsT> = ({ desc }) => {
  const navigator = useRouteNavigator();

  const handleClose = () => navigator.hidePopout();

  return (
    <div>
      <Alert
        onClose={handleClose}
        header="Успех"
        text={desc}
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
