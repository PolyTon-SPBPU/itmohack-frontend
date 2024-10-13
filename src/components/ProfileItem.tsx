import { FC } from "react";
import { Card } from "@vkontakte/vkui";
import { useGetScreenWidth } from "../utils";
import { ShopItemT } from "../types";

type ProfileItemPropsT = {
  item: ShopItemT;
};

const imgs = [
  "/items/merch-1.png",
  "/items/merch-2.png",
  "/items/merch-3.png",
  "/items/merch-4.png",
  "/items/merch-5.png",
  "/items/merch-6.png",
  "/items/merch-7.png",
  "/items/merch-8.png",
  "/items/merch-9.png",
  "/items/merch-10.png",
  "/items/merch-11.png",
  "/items/merch-12.png",
  "/items/merch-13.png",
  "/items/merch-14.png",
  "/items/merch-15.png",
];
const borderImgs = [
  "/items/border-1.png",
  "/items/border-2.png",
  "/items/border-3.png",
  "/items/border-4.png",
  "/items/border-5.png",
];

export const ProfileItem: FC<ProfileItemPropsT> = ({ item }) => {
  const screenWidth = useGetScreenWidth();
  const cardSize = screenWidth
    ? (screenWidth - 48) / 4 - 4 + "px"
    : 0;

  const imgSrc =
    item.type === "border"
      ? borderImgs[item.id % 5]
      : imgs[item.id % imgs.length];

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
