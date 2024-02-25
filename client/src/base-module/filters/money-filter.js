import numberFormatter from "number-formatter";

const moneyFilter = function(
  defaultCurrency,
  currencyList = { 1: { symbol: "$" } }
) {
  return function(value, currency = defaultCurrency) {
    if (currencyList[currency]) {
      return numberFormatter(
        `${currencyList[currency].symbol} #,##0.00`,
        value
      );
    }
    return numberFormatter(`#,##0.00`, value) || "";
  };
};

export default moneyFilter;
