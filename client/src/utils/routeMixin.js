var routeMixin = {
  methods: {
    setQueryParam(keyOrParams, value = "") {
      let nextQuery = {};
      if (typeof keyOrParams === "object") {
        nextQuery = {
          ...this.$route.query,
          ...keyOrParams
        };
      } else if (this.$route.query[keyOrParams] != value) {
        var params = {};
        params[keyOrParams] = value;
        nextQuery = {
          ...this.$route.query,
          ...params
        };
      } else {
        return;
      }

      this.$router
        .replace({
          query: nextQuery
        })
        .catch(() => {});
    },
    addQueryParam(key, value) {
      if (this.$route.query[key] != value) {
        var params = {};
        params[key] = value;
        this.$router.push({
          query: {
            ...this.$route.query,
            ...params
          }
        });
      }
    }
  }
};

export default routeMixin;
export { routeMixin };
