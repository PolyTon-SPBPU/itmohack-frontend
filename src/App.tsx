import { useState, useEffect } from "react";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import {
  View,
  SplitLayout,
  SplitCol,
  // ScreenSpinner,
} from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import "./globals.css";

import { Home, Task, Profile } from "./panels";
import { APP_PANELS } from "./routes";

export const App = () => {
  const { panel: activePanel = APP_PANELS.HOME } =
    useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<
    UserInfo | undefined
  >();
  // const [popout, setPopout] = useState<ReactNode | null>(
  //   <ScreenSpinner size="large" />
  // );

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      // setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Task id="task" />
          <Profile id="profile" />
          <Home id="home" fetchedUser={fetchedUser} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
