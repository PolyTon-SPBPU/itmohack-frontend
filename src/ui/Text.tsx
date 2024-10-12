import { FC, CSSProperties, ReactNode } from "react";
import { Text as TextVK } from "@vkontakte/vkui";
import { SystemColorT } from "../types/general";

const sizeStyles = {
  12: { fontSize: "12px" },
  14: { fontSize: "14px" },
  15: { fontSize: "15px" },
  16: { fontSize: "16px" },
  18: { fontSize: "18px" },
  20: { fontSize: "20px" },
  22: { fontSize: "22px" },
  24: { fontSize: "24px" },
  28: { fontSize: "28px" },
  32: { fontSize: "32px" },
};

const weightStyles = {
  400: { fontWeight: "400" },
  500: { fontWeight: "500" },
  600: { fontWeight: "600" },
  700: { fontWeight: "700" },
  800: { fontWeight: "800" },
};

export type TextSizeT = keyof typeof sizeStyles;
export type TextWeightT = keyof typeof weightStyles;

export type TextPropsT = {
  children: ReactNode;
  className?: string;
  size?: TextSizeT;
  weight?: TextWeightT;
  style?: CSSProperties;
  color?: SystemColorT;
  mb?: number;
};

export const Text: FC<TextPropsT> = ({
  size = 16,
  weight = 400,
  mb,
  style,
  children,
  color,
}) => {
  return (
    <TextVK
      style={{
        ...style,
        color: color && `var(--color-${color})`,
        marginBottom: mb && mb + "px",
        ...sizeStyles[size],
        ...weightStyles[weight],
      }}
    >
      {children}
    </TextVK>
  );
};
