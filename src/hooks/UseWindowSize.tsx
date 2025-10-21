import * as React from "react";

type WindowSize = {
  width: number;
  height: number;
};

export function useWindowSize(): WindowSize {
  const getSize = (): WindowSize => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [size, setSize] = React.useState<WindowSize>(getSize);

  React.useEffect(() => {
    const onResize = (): void => setSize(getSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}
