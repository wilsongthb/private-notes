import moment from "moment";

const myMoment = moment;
myMoment.locale("es");

const momentDateTimeFormat = "YYYY-MM-DD HH:mm";
const momentDateFormat = "YYYY-MM-DD";

const getCurrentDate = function () {
  return myMoment().format(momentDateFormat);
};

const formatMonthsDiff = function (months = 0) {
  if (months > 12) {
    let years = parseInt(months / 12);
    let monthsRest = months % 12;
    return (
      `${years} ${years == 1 ? "año" : "años"} y` +
      ` ${monthsRest} ${monthsRest == 1 ? "mes" : "meses"}`
    );
  }
  return `${months} meses`;
};

const getInDateFormat = function () {
  return this.format(momentDateFormat);
};

myMoment.getCurrentDate = getCurrentDate;
myMoment.prototype.getCurrentDate = getCurrentDate;
myMoment.prototype.formatMonthsDiff = formatMonthsDiff;
myMoment.prototype.getInDateFormat = getInDateFormat;

export {
  myMoment,
  momentDateTimeFormat,
  momentDateFormat,
  getCurrentDate,
  formatMonthsDiff
};
export default myMoment;
