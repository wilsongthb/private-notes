import validate from "validate.js";
import { myMoment } from "./myMoment.js";

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function(value) {
    return +myMoment.utc(value);
  },
  // Input is a unix timestamp
  format: function(value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return myMoment.utc(value).format(format);
  }
});

// SPANISH MESSAGES
validate.validators.email.options = {
  message: "^No es un correo electrónico válido"
};
validate.validators.length.options = { tooLong: "^Máximo %{count} caracteres" };
validate.validators.numericality.options = {
  notValid: "^No es un número válido",
  notEqualTo: "^No es igual a %{count}",
  notLessThan: "^Debería de ser menor a %{count}",
  notGreaterThan: "^Debería de ser mayor a %{count}"
};
validate.validators.presence.options = { message: "^Requerido" };

function validator(data = {}, rules = {}, options = { fullMessages: true }) {
  let resultValidation = validate(data, rules, options);
  return resultValidation ? resultValidation : false;
}

export default validator;
export { validator };
