import { FC, CSSProperties } from "react";
import { Flex } from "@vkontakte/vkui";
import { Text, TextPropsT } from "./Text";
import { XPTokenSVG } from "./XPTokenSVG";
import { ITokenSVG } from "./ITokenSVG";

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
      style={{ ...style, columnGap: "3px" }}
    >
      <Text {...props} size={size} color="primary" weight={800}>
        {children || 0}
      </Text>
      {type === "normal" ? (
        <ITokenSVG
          width={size - 1}
          color="primary"
          style={{ transform: `translateY(-1px)` }}
        />
      ) : (
        <XPTokenSVG width={size / 1.5} color="primary" />
      )}
    </Flex>
  );
};
