export type SystemColorT =
  "white" |
  "gray-light" |
  "primary" |
  "black"

export type SVGPropsT = {
  width: number;
  color: SystemColorT
  style?: React.CSSProperties
}