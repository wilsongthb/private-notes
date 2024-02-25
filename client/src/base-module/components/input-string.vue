<template>
  <input
    type="text"
    class="form-control"
    v-model="valueChild"
    :maxlength="maxlength"
  />
</template>
<script>
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    value: {},
    maxlength: { default: 255 }
  },

  data: () => ({
    //
  }),

  computed: {
    valueChild: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
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

<style></style>
