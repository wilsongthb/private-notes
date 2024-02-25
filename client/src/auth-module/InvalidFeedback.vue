<template>
  <div class="invalid-feedback">
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

<style scoped></style>
