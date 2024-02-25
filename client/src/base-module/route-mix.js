export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    //
  },

  data: () => ({
    //
  }),

  computed: {
    //
  },

  watch: {
    //
  },

  mounted() {
    //
  },

  methods: {
    routeMixAddQueryParam(key, value) {
      let queryParams = {
        ...this.$route.query
      };
      queryParams[key] = value;
      this.$router.push({
        query: queryParams
      });
    }
  }
};
