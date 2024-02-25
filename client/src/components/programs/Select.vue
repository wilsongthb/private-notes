<!-- Author: Wilson Pilco Nunez -->
<!-- Email: wilsonaux1@gmail.com -->
<!-- Created at: 2021-06-17 16:17 -->
<template>
  <select
    class="form-select"
    aria-label="Default select example"
    v-model="valueChild"
  >
    <option :value="undefined"></option>
    <option v-for="l in options" :key="l.id" :value="l.id">{{ l.slug }}</option>
  </select>
</template>
<script>
import BackendService from "src/BackendService.js";
export default {
  components: {
    //
  },

  // directives
  // filters

  props: {
    value: { required: true }
  },

  data: () => ({
    options: []
  }),

  computed: {
    valueChild: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },

  // watch: {},

  mounted() {
    BackendService.getPrograms().then((res) => {
      this.options = res.results;
    });
  },

  methods: {
    //
  }
};
</script>

<style scoped></style>
