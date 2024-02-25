import numberFormatter from "number-formatter";

const numberFilter = function(value, format = "0.00") {
  return numberFormatter(format, value);
};

export default numberFilter;
