import { FC } from "react";
import { Tabs, TabsItem } from "@vkontakte/vkui";
import { HOME_PANELS } from "../routes";

type PanelTabsPropsT = {
  selected: string;
  setSelected: (val: string) => void;
};

const tabs = [
  {
    name: HOME_PANELS.TASKS,
    title: "Квесты",
  },
  {
    name: HOME_PANELS.SHOP,
    title: "Магазин",
  },
  {
    name: HOME_PANELS.LEADERBOARD,
    title: "Лидеры",
  },
];

export const PanelTabs: FC<PanelTabsPropsT> = ({
  selected,
  setSelected,
}) => {
  return (
    <Tabs layoutFillMode="stretched">
      {tabs.map((tab) => (
        <TabsItem
          key={tab.name}
          selected={tab.name === selected}
          activated={true}
          onClick={() => setSelected(tab.name)}
          title={tab.title}
        >
          {tab.title}
        </TabsItem>
      ))}
    </Tabs>
  );
};
