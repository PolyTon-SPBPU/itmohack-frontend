import { FC, CSSProperties } from "react";
import { Flex } from "@vkontakte/vkui";
import { Text, TextPropsT } from "./Text";

type CurrencyPropsT = {
  type?: "normal" | "points";
  style?: CSSProperties;
} & TextPropsT;

export const Currency: FC<CurrencyPropsT> = ({
  children,
  size = 16,
  style = {},
  type = "normal",
  ...props
}) => {
  return (
    <Flex
      direction="row"
      align="center"
      justify="start"
      style={{ ...style, columnGap: "2px" }}
    >
      <Text {...props} size={size} color="primary" weight={800}>
        {children}
      </Text>
      {type === "normal" && (
        <img
          src="/i-token.png"
          alt="И"
          height={size}
          width={size * 0.72}
          style={{ transform: `translateY(-1px)` }}
        />
      )}
    </Flex>
  );
};
