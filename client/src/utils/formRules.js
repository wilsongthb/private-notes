import { getCurrentDate } from "./myMoment";

export const noFutureDateRule = {
  datetime: {
    dateOnly: true,
    latest: getCurrentDate(),
    message: "^Selecciona una fecha valida"
  }
};

export const fileSizeFormRule = {
  numericality: {
    greaterThan: 0,
    notGreaterThan: "^Seleccione un archivo",
    lessThan: 10485760,
    notLessThan: "^El archivo es muy grande, max 10MB"
  }
};
