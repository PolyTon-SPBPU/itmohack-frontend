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
        {children || 0}
      </Text>
      {type === "normal" ? (
        <img
          src="/i-token.svg"
          alt="И"
          height={size * 0.9}
          width={size * 0.9 * 0.72}
          style={{ transform: `translateY(-0.5px)` }}
        />
      ) : (
        <img
          src="/xp.svg"
          alt="xp"
          height={size * 1.2 * 0.68}
          width={size * 1.2}
          style={{ transform: `translateY(2px)` }}
        />
      )}
    </Flex>
  );
};
