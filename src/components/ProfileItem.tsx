import { FC } from "react";
import { Card } from "@vkontakte/vkui";
import { useGetScreenWidth } from "../utils";
// import { ShopItemT } from "../types";

// type ProfileItemPropsT = {
//   item: ShopItemT;
//   // balance
// };

export const ProfileItem: FC = () => {
  const screenWidth = useGetScreenWidth();
  const cardSize = screenWidth
    ? (screenWidth - 48) / 4 - 4 + "px"
    : 0;

  return (
    <Card
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        width: screenWidth ? cardSize : "20%",
        height: screenWidth ? cardSize : "auto",
      }}
    ></Card>
  );
};
