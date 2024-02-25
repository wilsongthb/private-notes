const fileUrl = function(value) {
  return value ? `${process.env.VUE_APP_API_URL}files/${value}` : "";
};

export default fileUrl;
export { fileUrl };
