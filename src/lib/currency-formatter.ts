export const currencyFormatter = (value: number) => {
  return value.toLocaleString("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};
