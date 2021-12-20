export const capitalizar = (palabra: string) => {
  return palabra.trim().replace(/^\w/, (c) => c.toUpperCase());
};
