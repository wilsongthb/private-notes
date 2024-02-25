import { mapState } from "vuex";

export const authMixin = {
  computed: {
    ...mapState("auth", {
      logged: (s) => s.logged
    })
  },
  watch: {
    logged: {
      immediate: true,
      handler(to) {
        if (!to) {
          this.$router.push({
            name: "login",
            query: {
              redirect: this.$route.fullPath
            }
          });
        }
      }
    }
  }
};
