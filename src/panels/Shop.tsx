import { FC } from "react";
import { Flex } from "@vkontakte/vkui";
import { ShopItemT } from "../types";
import { ShopItem } from "../components";
import { Text } from "../ui";

const MOCK_ITEMS: ShopItemT[] = [
  {
    id: 0,
    price: 1000,
    type: "border",
  },
  {
    id: 1,
    price: 2000,
    type: "border",
  },
  {
    id: 2,
    price: 3000,
    type: "border",
  },
];

export const Shop: FC = () => {
  return (
    <Flex
      direction="column"
      align="stretch"
      style={{ rowGap: "12px", padding: "22px 24px" }}
    >
      <Text size={16} weight={600} mb={10}>
        Рамки:
      </Text>
      <Flex
        direction="row"
        justify="start"
        align="start"
        style={{
          columnGap: "12px",
          marginBottom: "20px",
          height: "auto",
        }}
      >
        {MOCK_ITEMS.map((item) => (
          <ShopItem key={item.id} item={item} />
        ))}
      </Flex>
      <Text size={16} weight={600} mb={10}>
        Шапки:
      </Text>
      <Flex
        direction="row"
        justify="start"
        align="start"
        style={{ columnGap: "12px", height: "fit-content" }}
      >
        {MOCK_ITEMS.map((item) => (
          <ShopItem key={item.id} item={item} />
        ))}
      </Flex>
    </Flex>
  );
};
