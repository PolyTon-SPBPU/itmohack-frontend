import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { httpService } from "./services";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  SplitLayout,
  SplitCol,
  // ScreenSpinner,
} from "@vkontakte/vkui";
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import "./globals.css";

import { Home, Task, Profile } from "./panels";
import { APP_PANELS, MODAL } from "./routes";
import { AppModalRoot } from "./modals";

export const App = () => {
  const navigator = useRouteNavigator();
  const [{ access_token }] = useCookies(["access_token"]);
  const { panel: activePanel = APP_PANELS.HOME } =
    useActiveVkuiLocation();

  useEffect(() => {
    async function fetchData() {
      navigator.showModal(MODAL.REGISTER);

      try {
        await httpService(access_token).get("/auth/user/me");
        return;
      } catch (err) {
        const launchParams = await bridge.send(
          "VKWebAppGetLaunchParams"
        );

        const userExists = await httpService(
          access_token
        ).get<boolean>(`/user/exist/${launchParams.vk_user_id}`);

        if (userExists) {
          navigator.push(`/${MODAL.LOGIN}`, {
            user_id: launchParams.vk_user_id + "",
          });
        } else {
          navigator.showModal(MODAL.REGISTER);
        }
      }
    }

    fetchData();
  }, [access_token, navigator]);

  return (
    <SplitLayout modal={<AppModalRoot />}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Task id="task" />
          <Profile id="profile" />
          <Home id="home" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
