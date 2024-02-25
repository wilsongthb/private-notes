const imageUrl = function(value) {
  return value
    ? `${process.env.VUE_APP_API_URL}files/${value}`
    : "/images/noimg_4x3.png";
};

export default imageUrl;
export { imageUrl };
