import { FC } from "react";
import { Card } from "@vkontakte/vkui";
import { ShopItemT } from "../types";
import { Currency } from "../ui";
import { useGetScreenWidth } from "../utils";

const MOCK_BALANCE = 1000;

type ShopItemPropsT = {
  item: ShopItemT;
  // balance
};

export const ShopItem: FC<ShopItemPropsT> = ({ item }) => {
  const percent = MOCK_BALANCE / item.price;

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
    >
      <Currency
        size={12}
        style={{
          position: "absolute",
          bottom: "8px",
          left: "0%",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {item.price}
      </Currency>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "6px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: percent * 100 + "%",
            height: "100%",
            backgroundColor: "#4980AD",
          }}
        ></div>
      </div>
    </Card>
  );
};
