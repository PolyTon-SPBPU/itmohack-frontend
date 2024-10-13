import { FC, useMemo } from "react";
import { Flex, Skeleton } from "@vkontakte/vkui";
import { ShopItemT } from "../types";
import { ShopItem } from "../components";
import { Text } from "../ui";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { httpService } from "../services/http.service";
import { ItemCategoryT } from "../types/shop";

export const Shop: FC = () => {
  const [{ access_token }] = useCookies(["access_token"]);
  const { data, isLoading } = useQuery<{ data: ShopItemT[] }>({
    queryKey: ["shop-items"],
    queryFn: () => httpService(access_token).get("/item"),
  });

  const items = useMemo(
    () =>
      data?.data.map((item) => ({
        ...item,
        type: (item.name.toLowerCase().includes("рамка")
          ? "border"
          : "merch") as ItemCategoryT,
      })) || [],
    [data]
  );

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
          rowGap: "12px",
          marginBottom: "20px",
          height: "auto",
        }}
      >
        {isLoading ? (
          <>
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
          </>
        ) : !items.length ? (
          <Text>Пока что ничего нет</Text>
        ) : (
          items
            .filter((item) => item.type === "border")
            .map((item) => (
              <ShopItem key={item.id} item={item} />
            ))
        )}
      </Flex>
      <Text size={16} weight={600} mb={10}>
        Мерч:
      </Text>
      <Flex
        direction="row"
        justify="start"
        align="start"
        style={{ columnGap: "12px", height: "fit-content" }}
      >
        {isLoading ? (
          <>
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
            <Skeleton
              width="22%"
              height={100}
              borderRadius={8}
            />
          </>
        ) : !items.length ? (
          <Text>Пока что ничего нет</Text>
        ) : (
          items
            .filter((item) => item.type === "merch")
            .map((item) => (
              <ShopItem key={item.id} item={item} />
            ))
        )}
      </Flex>
    </Flex>
  );
};
