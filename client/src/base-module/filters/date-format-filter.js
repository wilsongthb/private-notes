import moment from "moment";
import { MOMENT_TIME_FORMAT } from "../consts";

export const momentFormat = function (momentInstance = moment) {
  return function (value, format, formatInput = "") {
    return momentInstance(value, formatInput || undefined).format(format);
  };
};

/**
 * Default format "L"
 */
export const dateFormatFilter = function (moment) {
  return function (value) {
    if (!value) value = "";
    let time = moment(value);
    return time.format("L");
  };
};

/**
 * @result: a few seconds ago
 */
export const relativeTimeFilter = function (moment) {
  return function (value) {
    if (!value) value = "";
    let time = moment(value);
    return time.fromNow();
  };
};

/**
 * @result: Last Wednesday at 11:55 AM
 */
export const calendarFilter = function (moment) {
  return function (value) {
    if (!value) value = "";
    let time = moment(value);
    return time.calendar();
  };
};

/**
 * @result: 11:55am
 */
export const timeFormatFilter = function (moment) {
  return function (value) {
    if (!value) value = "";
    let time = moment(value);
    return time.format(MOMENT_TIME_FORMAT);
  };
};

/**
 * @result: January 13, 2021 11:55 AM
 */
export const dateTimeFormatFilter = function (moment) {
  return function (value) {
    if (!value) value = "";
    let time = moment(value);
    // return time.format("DD/MM/YYYY LT");
    return time.format("DD/MM/YYYY hh:mma");
  };
};

/**
 * @result: 13 Jan
 */
export const simpleDateFormatFilter = function (moment) {
  return function (value) {
    if (!value) value = "";
    let time = moment(value);
    return time.format("D MMM");
  };
};

/**
 * @result: 2 days
 */
export const ageFilter = function (moment) {
  return function (value) {
    if (!value) value = "";
    let time = moment(value);
    return time.fromNow(true);
  };
};

/**
 * @result: thursday
 */
export const dayOfWeek = function (moment) {
  return function (value) {
    if (!value) value = "";
    let time = moment(value);
    return time.format("dddd");
  };
};

// export const relativeHumanFilter = function (moment) {
//   return function(value) {
//     if(!value) value = "";
//     let time = moment(value);
//     return time.relativeTimeThreshold()
//   }
// }
