/**
 * base4Humans
 * This script format bytes to humans minds
 */

const scaler = 1024;
const bytes4Humans = function(bytes = 0) {
  var i = -1;
  var byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
  do {
    bytes = bytes / scaler;
    i++;
  } while (bytes > scaler);

  return Math.max(bytes, 0.1).toFixed(1) + byteUnits[i];
};

export default bytes4Humans;
