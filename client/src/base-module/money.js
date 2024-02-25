import numberFormatter from "number-formatter";

class Currency {
  constructor(name, code, num, symbol) {
    this.name = name;
    this.code = code;
    this.num = num;
    this.symbol = symbol;
  }

  format(value) {
    return numberFormatter(`${this.symbol} #,##0.00`, value);
  }
}

const currencyList = [
  new Currency("Soles", "PEN", 604, "S/"),
  new Currency("Dolares", "USD", 840, "$")
];

export { currencyList };
