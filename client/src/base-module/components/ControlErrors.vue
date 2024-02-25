<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<template>
  <div v-show="errors">
    <small class="form-text text-danger">{{ feedback }} </small>
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
