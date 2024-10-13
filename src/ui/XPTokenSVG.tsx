import { FC } from "react";
import { SVGPropsT } from "../types";
import { useCSSVars } from "../utils/useCSSVars";

export const XPTokenSVG: FC<SVGPropsT> = ({ width, color }) => {
  const currentColor = useCSSVars("color", color);

  return (
    <svg
      width={width * 2.1}
      height={width}
      viewBox="0 0 170 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M83.9011 81H60.808L41.1963 54.0774L21.7006 81H0L30.8682 39.9198L1.04441 0H23.9054L42.8209 25.9943L61.6203 0H82.9728L52.9169 39.5716L83.9011 81ZM139.912 0C159.949 0 170 8.97421 170 26.9226C170 36.593 167.259 43.5172 161.844 47.6948C156.506 51.795 148.46 53.8453 137.707 53.8453H113.221V81H93.3772V0H139.912ZM137.823 38.2951C142.155 38.2951 145.211 37.3282 146.99 35.394C148.77 33.4598 149.659 30.6361 149.659 26.9226C149.659 23.2092 148.77 20.3854 146.99 18.4513C145.211 16.5172 142.155 15.5501 137.823 15.5501H113.221V38.2951H137.823Z"
        fill={currentColor}
      />
    </svg>
  );
};
