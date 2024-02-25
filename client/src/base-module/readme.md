# HOW TO ADD

```js
import BaseModule from "m31-base-module";

Vue.use(BaseModule, {
  locale: "es",
  defaultCurrency: 1,
  currencyList: {
    1: { name: "SOLES", symbol: "S/", code: "PEN" },
    2: { name: "DOLARES", symbol: "$", code: "USD" }
  }
});
```

# Filters


