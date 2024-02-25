<template>
  <div class="app-invalid-feedback">
    <span>{{ feedback }}</span>
  </div>
</template>
<script>
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    errors: {
      default: () => []
    }
  },

  data: () => ({
    //
  }),

  computed: {
    feedback() {
      return this.errors.reduce((c, n) => {
        return c + (c.length > 0 ? ", " : "") + n;
      }, "");
    }
  },

  watch: {
    //
  },

  mounted() {
    //
  },

  methods: {
    //
  }
};
</script>

<style scoped>
.app-invalid-feedback {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>
