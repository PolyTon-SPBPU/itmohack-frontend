export const useCSSVars = (category: string, name: string) => {
  const style = getComputedStyle(document.body);
  return (
    style.getPropertyValue(`--${category}-${name}`) || "inherit"
  );
};
