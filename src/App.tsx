import { useEffect, useState } from "react";
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
  usePopout,
} from "@vkontakte/vk-mini-apps-router";
import "./globals.css";

import { Home, Task, Profile } from "./panels";
import { APP_PANELS, MODAL } from "./routes";
import { AppModalRoot } from "./modals";
import { UserInfo } from "@vkontakte/vk-bridge";

export const App = () => {
  const navigator = useRouteNavigator();
  const [{ access_token }] = useCookies(["access_token"]);
  const [user, setUser] = useState<UserInfo | null>();
  const { panel: activePanel = APP_PANELS.HOME } =
    useActiveVkuiLocation();
  const popout = usePopout();

  useEffect(() => {
    async function fetchData() {
      try {
        await httpService(access_token).get("/auth/user/me");
      } catch (err) {
        const launchParams = await bridge.send(
          "VKWebAppGetLaunchParams"
        );

        const { data: userExists } = await httpService(
          access_token
        ).get<boolean>(`/user/exist/${launchParams.vk_user_id}`);

        if (userExists) {
          navigator.showModal(MODAL.LOGIN);
        } else {
          navigator.showModal(MODAL.REGISTER);
        }
      }

      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
    }

    fetchData();
  }, [access_token, navigator]);

  return (
    <SplitLayout
      modal={<AppModalRoot user={user} />}
      popout={popout}
    >
      <SplitCol>
        <View activePanel={activePanel}>
          <Task user={user} id="task" />
          <Profile id="profile" />
          <Home id="home" />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
