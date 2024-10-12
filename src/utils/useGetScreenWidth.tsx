import { useEffect, useState } from "react";

export const useGetScreenWidth = () => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!window) return;
    setWidth(window.innerWidth);
  }, [setWidth]);

  return width;
};
