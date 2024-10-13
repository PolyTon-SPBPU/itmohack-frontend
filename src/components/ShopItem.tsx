import { FC } from "react";
import { Card } from "@vkontakte/vkui";
import { ShopItemT } from "../types";
import { Currency } from "../ui";
import { useGetScreenWidth } from "../utils";
import { UserT } from "../types/users";
import { useQuery } from "@tanstack/react-query";
import { httpService } from "../services/http.service";
import { useCookies } from "react-cookie";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { MODAL } from "../routes";

type ShopItemPropsT = {
  item: ShopItemT;
};

export const ShopItem: FC<ShopItemPropsT> = ({ item }) => {
  const navigator = useRouteNavigator();
  const [{ access_token }] = useCookies(["access_token"]);

  const { data: userData } = useQuery<UserT>({
    queryKey: ["user-me"],
    queryFn: () =>
      httpService(access_token).get("/auth/user/me"),
  });

  const user = (userData || {}) as UserT;
  const percent = (user?.tokens || 0) / item.price;
  const imgSrc =
    item.type === "border"
      ? `/items/border-${item.id % 4}.png`
      : `/items/merch-${item.id % 10}.png`;

  const screenWidth = useGetScreenWidth();
  const cardSize = screenWidth
    ? (screenWidth - 48) / 4 - 4 + "px"
    : 0;

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
        width: screenWidth ? cardSize : "20%",
        height: screenWidth ? cardSize : "auto",
      }}
    >
      <img
        src={imgSrc}
        alt={item.name}
        style={{ width: "100%", height: "100%" }}
      />
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
          overflow: "hidden",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
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
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
        ></div>
      </div>
    </Card>
  );
};
