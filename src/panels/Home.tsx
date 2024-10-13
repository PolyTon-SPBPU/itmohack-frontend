import { FC, useState } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { PanelTabs, ProfilePreview } from "../components";
import { HOME_PANELS } from "../routes";
import { Tasks } from "./Tasks";
import { Shop } from "./Shop";
import { Leaderboard } from "./Leaderboard";

export interface HomeProps extends NavIdProps {
  user?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const [selected, setSelected] = useState<string>(
    HOME_PANELS.TASKS
  );

  return (
    <Panel id={id}>
      <div
        style={{ padding: "28px 24px", paddingBottom: "16px" }}
      >
        <ProfilePreview />
      </div>
      <PanelTabs selected={selected} setSelected={setSelected} />
      {selected === HOME_PANELS.TASKS && <Tasks />}
      {selected === HOME_PANELS.SHOP && <Shop />}
      {selected === HOME_PANELS.LEADERBOARD && <Leaderboard />}
    </Panel>
  );
};
