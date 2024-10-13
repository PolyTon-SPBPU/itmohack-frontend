import { FC } from "react";
import { Card } from "@vkontakte/vkui";
import { ShopItemT } from "../types";
import { Currency } from "../ui";
import { useGetScreenWidth } from "../utils";
import { UserT } from "../types/users";
import { useQuery } from "@tanstack/react-query";
import { httpService } from "../services/http.service";
import { useCookies } from "react-cookie";

type ShopItemPropsT = {
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

export const ShopItem: FC<ShopItemPropsT> = ({ item }) => {
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
      ? borderImgs[item.id % 5]
      : imgs[item.id % imgs.length];

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
      <img
        src={imgSrc}
        alt={item.name}
        style={{ width: "100%", height: "100%" }}
      />
    </Card>
  );
};
