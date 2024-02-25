export const percentFilter = function(value = "", decimals) {
  if (!value) value = 0;
  if (!decimals) decimals = 0;
  value = value * 100;
  return (
    Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals) + "%"
  );
};
