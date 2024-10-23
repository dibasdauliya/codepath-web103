export const calculateTotalPrice = (basePrice, optionsPrice) => {
  const totalOptionsPrice = Object.values(optionsPrice).reduce(
    (acc, curr) => acc + curr
  );
  return basePrice + totalOptionsPrice;
};
