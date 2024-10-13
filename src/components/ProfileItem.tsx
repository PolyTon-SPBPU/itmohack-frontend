import { FC } from "react";
import { Card } from "@vkontakte/vkui";
import { useGetScreenWidth } from "../utils";
import { ShopItemT } from "../types";

type ProfileItemPropsT = {
  item: ShopItemT;
};

export const ProfileItem: FC<ProfileItemPropsT> = ({ item }) => {
  const screenWidth = useGetScreenWidth();
  const cardSize = screenWidth
    ? (screenWidth - 48) / 4 - 4 + "px"
    : 0;

  const imgSrc =
    item.type === "border"
      ? `/items/border-${item.id % 4}.png`
      : `/items/merch-${item.id % 10}.png`;

  return (
    <Card
      style={{
        borderRadius: "8px",
        width: screenWidth ? cardSize : "20%",
        height: screenWidth ? cardSize : "auto",
      }}
    >
      <img src={imgSrc} alt={item.name} />
    </Card>
  );
};
