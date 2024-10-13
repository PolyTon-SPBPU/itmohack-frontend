import { FC, CSSProperties } from "react";
import { Flex } from "@vkontakte/vkui";
import { Text, TextPropsT } from "./Text";

type CurrencyPropsT = { style?: CSSProperties } & TextPropsT;

export const Currency: FC<CurrencyPropsT> = ({
  children,
  size = 16,
  style = {},
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
      <img
        src="/i-token.png"
        alt="И"
        height={size}
        width={size * 0.78}
        style={{ transform: `translateY(-${size / 16}px)` }}
      />
    </Flex>
  );
};
