import _ from "lodash";

const dayTimes = [];
var tf = (tm) => {
  return _.padStart(tm, 2, "0");
};
Array.from(Array(24 * 60), (x, y) => y).map((y) => {
  dayTimes.push({
    value: `${tf(parseInt(y / 60))}:${tf(y % 60)}:00`,
    // valueWithSeconds: `${tf(parseInt(y / 60))}:${tf(y % 60)}:00`,
    time: `${tf(parseInt(y / 60))}:${tf(y % 60)}`,
    hours: parseInt(y / 60),
    minutes: y % 60
  });
});

export { dayTimes };
