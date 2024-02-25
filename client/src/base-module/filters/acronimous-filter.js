export default function(value = "") {
  let list = value.split(" ");
  return list.reduce((p, c) => {
    return `${p}${c.length > 0 ? c[0].toUpperCase() + "." : ""}`;
  }, "");
}
