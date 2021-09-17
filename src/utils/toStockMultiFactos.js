export const toStockMultiFactos = (symbol, raw) => {
  const { c, d, dp } = raw;
  return {
    symbol,
    currentPrice: c,
    change: d,
    percentChange: dp,
  };
};
