import { FC } from "react";
import { Card } from "@vkontakte/vkui";
import { ShopItemT } from "../types";
import { Currency } from "../ui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { MODAL } from "../routes";

type ShopItemPropsT = {
  item: ShopItemT;
};

export const ShopItem: FC<ShopItemPropsT> = ({ item }) => {
  const navigator = useRouteNavigator();

  const imgSrc =
    item.type === "border"
      ? `/items/border-${item.id % 4}.png`
      : `/items/merch-${item.id % 10}.png`;
  const handleClick = () => {
    navigator.push(
      "/" + MODAL.SHOP_ITEM + "?item_id=" + item.id
    );
  };

  return (
    <Card
      onClick={handleClick}
      style={{
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        width: "45%",
        maxWidth: "200px",
        minWidth: "100px",
        height: "120px",
      }}
    >
      <img
        src={imgSrc}
        alt={item.name}
        style={{ width: "100%", height: "100%" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "32px",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Currency size={14}>{item.price}</Currency>
      </div>
    </Card>
  );
};
