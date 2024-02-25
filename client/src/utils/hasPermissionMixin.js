export default {
  methods: {
    hasPermission: function(permission) {
      return this.$store.state.permissions.includes(permission);
    }
  }
};
