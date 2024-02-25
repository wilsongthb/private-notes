<template>
  <div class="app_feedback">{{ feedback }}</div>
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
.app_feedback {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: var(--red);
}
</style>
